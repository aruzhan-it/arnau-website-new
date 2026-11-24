import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { motion } from 'framer-motion'

// ==========================================
// 1. СТРАНИЦА АДМИНКИ (CRM)
// ==========================================
function Admin() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [leads, setLeads] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => authListener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) fetchLeads()
  }, [session])

  const fetchLeads = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    if (data) setLeads(data)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
  }

  const handleDelete = async (id) => {
    await supabase.from('leads').delete().eq('id', id)
    fetchLeads()
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f24] text-white bg-grid">
        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 w-96 shadow-2xl">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center text-[#00E5FF]">Вход в CRM</h2>
          {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-2 rounded">{error}</p>}
          <input type="email" placeholder="Email" className="w-full bg-black/20 border border-white/10 p-4 rounded-xl mb-4 text-white focus:outline-none focus:border-[#00E5FF] transition-all" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Пароль" className="w-full bg-black/20 border border-white/10 p-4 rounded-xl mb-6 text-white focus:outline-none focus:border-[#00E5FF] transition-all" onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-[#00E5FF] text-black font-heading font-bold p-4 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]">Войти</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white p-8 bg-grid">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold">Заявки с сайта</h1>
          <button onClick={() => supabase.auth.signOut()} className="text-gray-400 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-lg bg-white/5">Выйти</button>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-black/20 text-gray-400 font-heading">
              <tr>
                <th className="p-5">Дата</th>
                <th className="p-5">Имя</th>
                <th className="p-5">Телефон</th>
                <th className="p-5">Сообщение</th>
                <th className="p-5">Действие</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 text-sm text-gray-400">{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td className="p-5 font-bold">{lead.name}</td>
                  <td className="p-5 text-[#00E5FF] font-mono">{lead.phone}</td>
                  <td className="p-5 text-sm text-gray-300">{lead.message}</td>
                  <td className="p-5"><button onClick={() => handleDelete(lead.id)} className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors">Удалить</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && <p className="p-10 text-center text-gray-500">Заявок пока нет...</p>}
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 2. ЛЕНДИНГ (ГЛАВНАЯ СТРАНИЦА)
// ==========================================
function Landing() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('leads').insert([formData])
    if (!error) {
      setSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
    }
    setLoading(false)
  }

  // Анимации
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white bg-grid relative selection:bg-[#00E5FF] selection:text-black">
      
      {/* Фоновое свечение */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0047FF]/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Навигация */}
      <nav className="relative z-50 flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-2xl font-heading font-bold tracking-widest text-white">&lt;/\&gt; <span className="text-[#00E5FF]">ARNAU</span></div>
        <a href="#contact" className="bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#00E5FF] hover:text-black transition-all duration-300">Обсудить проект</a>
      </nav>

      {/* Hero */}
      <motion.header initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between">
        <motion.div variants={fadeUp} className="md:w-3/5 pr-8">
          <div className="inline-block bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest mb-6">
            IT-КОМПАНИЯ · 5 ЛЕТ ОПЫТА
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] mb-6">
            Цифровое <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0047FF]">будущее</span> <br/>
            вашего бизнеса
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            Создаем сайты, которые привлекают клиентов, вызывают доверие и работают на вас 24/7. Доступно для малого и среднего бизнеса.
          </p>
        </motion.div>
        
        {/* 3D Макет */}
        <motion.div variants={fadeUp} className="md:w-2/5 mt-16 md:mt-0 flex justify-center relative perspective-1000">
          <div className="relative w-full h-80 flex items-center justify-center transform rotate-y-[-10deg] rotate-x-[5deg]">
            {/* Ноутбук */}
            <div className="relative w-72 h-44 bg-[#151d35] rounded-t-xl border-[6px] border-[#0a0f24] shadow-2xl z-10 flex flex-col p-2 transform -translate-x-4 hover:-translate-y-2 transition-transform duration-500">
              <div className="flex gap-1.5 mb-2 items-center">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div>
                <div className="w-5 h-1.5 bg-gray-600 rounded-full"></div>
                <div className="w-5 h-1.5 bg-gray-600 rounded-full"></div>
              </div>
              <div className="w-full flex-1 bg-gradient-to-br from-[#0047FF] to-black rounded-md border border-gray-700/50 flex flex-col p-3 shadow-inner">
                <div className="w-1/2 h-3 bg-white/20 rounded mb-2"></div>
                <div className="w-3/4 h-2 bg-white/10 rounded"></div>
              </div>
            </div>
            <div className="absolute bottom-[3.25rem] w-80 h-3 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-xl z-0 transform -translate-x-4"></div>
            {/* Смартфон */}
            <div className="absolute right-0 md:-right-4 bottom-6 z-20 w-24 h-48 bg-[#151d35] rounded-[1.5rem] border-[6px] border-[#0a0f24] shadow-2xl p-1.5 flex flex-col hover:-translate-y-2 transition-transform duration-500">
              <div className="w-1/2 h-1.5 bg-gray-600 rounded-full mx-auto mb-1.5"></div>
              <div className="w-full flex-1 bg-gradient-to-br from-[#00E5FF] to-[#0047FF] rounded-xl border border-gray-700/50 mb-1.5 shadow-inner"></div>
              <div className="w-full h-6 bg-[#0a0f24] rounded-md"></div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Почему нужен сайт (Bento) */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10">Почему вам нужен сайт?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { t: 'Новые клиенты', d: 'Вас находят там, где ищут', span: 'md:col-span-2 bg-gradient-to-br from-white/[0.08] to-white/[0.02]' },
            { t: 'Доверие', d: 'Сайт — лицо серьезной компании', span: 'md:col-span-1 bg-white/[0.03]' },
            { t: 'Заявки 24/7', d: 'Принимает обращения даже ночью', span: 'md:col-span-1 bg-white/[0.03]' },
            { t: 'Выделяетесь', d: 'Выглядите лучше конкурентов', span: 'md:col-span-4 bg-gradient-to-r from-[#0047FF]/20 to-transparent border-[#0047FF]/30' }
          ].map((item, i) => (
            <div key={i} className={`p-8 rounded-3xl border border-white/10 hover:border-[#00E5FF]/30 transition-all duration-300 ${item.span}`}>
              <h3 className="text-xl font-heading font-bold mb-2 text-white">{item.t}</h3>
              <p className="text-gray-400">{item.d}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Услуги (Bento-grid) */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Что мы предлагаем</h2>
          <div className="hidden md:block h-px bg-white/10 flex-1 ml-8 mb-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Корпоративные сайты', desc: 'Солидное лицо вашей компании', span: 'md:col-span-2 bg-gradient-to-br from-[#0047FF]/10 to-transparent' },
            { title: 'Интернет-магазины', desc: 'Продажи без выходных', span: 'md:col-span-1' },
            { title: 'Лендинги', desc: 'Одна страница — одна цель', span: 'md:col-span-1' },
            { title: 'Сайты-визитки', desc: 'Быстрый старт в интернете', span: 'md:col-span-1' },
            { title: 'Индивидуальные решения', desc: 'Под задачи вашего бизнеса', span: 'md:col-span-1' }
          ].map((service, i) => (
            <div key={i} className={`group p-8 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#00E5FF]/40 transition-all duration-300 cursor-default ${service.span}`}>
              <div className="w-10 h-10 rounded-full bg-[#00E5FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div>
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Этапы */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">Как мы работаем</h2>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative">
          <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] bg-white/10 z-0"></div>
          {['Знакомство', 'Идея', 'Дизайн', 'Разработка', 'Запуск'].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-start md:items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-[#0a0f24] border-2 border-[#00E5FF] text-[#00E5FF] font-heading font-bold flex items-center justify-center text-lg mb-4 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                0{i + 1}
              </div>
              <p className="font-heading font-semibold text-lg">{step}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Форма (Glassmorphism) */}
      <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-heading font-bold mb-4 leading-tight">Давайте развивать ваш бизнес вместе!</h2>
            <p className="text-gray-400 mb-8">Есть бизнес? Мы поможем ему заявить о себе в интернете. Оставьте заявку, и мы свяжемся с вами в течение 15 минут.</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Отвечаем быстро</div>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full">
            {success ? (
              <div className="text-center p-8 bg-green-500/10 rounded-2xl border border-green-500/30">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-heading font-bold text-green-400 mb-2">Заявка отправлена!</h3>
                <p className="text-gray-400 text-sm">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="Как к вам обращаться?" required className="w-full bg-black/30 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00E5FF] transition-all placeholder:text-gray-500" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="tel" placeholder="Номер телефона или WhatsApp" required className="w-full bg-black/30 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00E5FF] transition-all placeholder:text-gray-500" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <textarea placeholder="Кратко опишите задачу" rows="3" required className="w-full bg-black/30 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00E5FF] transition-all placeholder:text-gray-500 resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                <button type="submit" disabled={loading} className="w-full bg-[#00E5FF] text-black font-heading font-bold text-lg p-4 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] mt-2">
                  {loading ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* Подвал */}
      <footer className="relative z-10 border-t border-white/5 py-10 text-center flex flex-col items-center">
        <div className="text-xl font-heading font-bold tracking-widest text-white mb-4">&lt;/\&gt; <span className="text-[#00E5FF]">ARNAU</span></div>
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} ARNAU. Разработка сайтов для бизнеса.</p>
      </footer>
    </div>
  )
}

// ==========================================
// 3. РОУТИНГ
// ==========================================
export default function App() {
  const isAdmin = window.location.pathname === '/admin'
  return isAdmin ? <Admin /> : <Landing />
}