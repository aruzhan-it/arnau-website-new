import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { motion } from 'framer-motion'
import logo from './logo2.png'

// ==========================================
// СЛОВАРИ ДЛЯ МУЛЬТИЯЗЫЧНОСТИ (RU, KZ, EN)
// ==========================================
const translations = {
  ru: {
    navBtn: "Обсудить проект",
    heroBadge: "IT-КОМПАНИЯ · 5 ЛЕТ ОПЫТА",
    heroTitle1: "Сайты, которые",
    heroTitle2: "продают",
    heroSub: "Создаем цифровые решения для бизнеса. Быстро, современно, под ключ.",
    servicesTitle: "Что мы делаем",
    calcTitle: "Рассчитайте стоимость",
    calcBadge: "🔥 Первым 5 клиентам — спеццена!",
    calcType: "Тип сайта",
    calcExtra: "Дополнительно",
    calcBtn: "Узнать точную цену",
    calcTotal: "Примерная стоимость:",
    reviewsTitle: "Нам доверяют",
    formTitle: "Готовы начать?",
    formName: "Ваше имя",
    formPhone: "WhatsApp / Телефон",
    formMsg: "Кратко о задаче",
    formBtn: "Отправить",
    success: "Заявка отправлена! Мы свяжемся с вами.",
  },
  kz: {
    navBtn: "Жобаны талқылау",
    heroBadge: "IT-КОМПАНИЯ · 5 ЖЫЛ ТӘЖІРИБЕ",
    heroTitle1: "Бизнесіңізді өркендететін",
    heroTitle2: "сайттар",
    heroSub: "Бизнесіңіз үшін заманауи цифрлық шешімдер. Жылдам әрі сапалы, толық дайын күйінде.",
    servicesTitle: "Біз не істейміз",
    calcTitle: "Құнын есептеңіз",
    calcBadge: "🔥 Алғашқы 5 клиентке — арнайы баға!",
    calcType: "Сайт түрі",
    calcExtra: "Қосымша қызметтер",
    calcBtn: "Нақты бағаны білу",
    calcTotal: "Шамамен құны:",
    reviewsTitle: "Клиенттердің пікірлері",
    formTitle: "Бастауға дайынсыз ба?",
    formName: "Сіздің есіміңіз",
    formPhone: "WhatsApp / Телефон",
    formMsg: "Жоба туралы қысқаша",
    formBtn: "Жіберу",
    success: "Сұранысыңыз қабылданды! Жақын арада хабарласамыз.",
  },
  en: {
    navBtn: "Discuss project",
    heroBadge: "IT COMPANY · 5 YEARS EXPERIENCE",
    heroTitle1: "Websites that",
    heroTitle2: "sell",
    heroSub: "We create digital solutions for business. Fast, modern, turnkey.",
    servicesTitle: "What we do",
    calcTitle: "Calculate cost",
    calcBadge: "🔥 Special price for first 5 clients!",
    calcType: "Website type",
    calcExtra: "Extra options",
    calcBtn: "Get exact price",
    calcTotal: "Estimated cost:",
    reviewsTitle: "Trusted by",
    formTitle: "Ready to start?",
    formName: "Your name",
    formPhone: "WhatsApp / Phone",
    formMsg: "Briefly about the task",
    formBtn: "Send",
    success: "Application sent! We will contact you.",
  }
}

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
          <button onClick={() => supabase.auth.signOut()} className="text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg bg-white/5">Выйти</button>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-x-auto shadow-2xl">
          <table className="w-full text-left min-w-[600px]">
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
                  <td className="p-5"><button onClick={() => handleDelete(lead.id)} className="text-red-400 hover:text-red-300 text-sm font-semibold">Удалить</button></td>
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
  const [lang, setLang] = useState('ru')
  const t = translations[lang]

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // СНИЖЕННЫЕ ЦЕНЫ (Стартовые)
  const [calcType, setCalcType] = useState(35000) 
  const [calcSpeed, setCalcSpeed] = useState(0) 

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

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white bg-grid relative selection:bg-[#00E5FF] selection:text-black font-sans">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0047FF]/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Кнопка WhatsApp */}
      <a 
        href="https://wa.me/77782631617" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>

      {/* Навигация */}
      <nav className="relative z-50 flex justify-between items-center py-4 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center">
          <img src={logo} alt="ARNAU" className="h-16 md:h-20 w-auto" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 rounded-full border border-white/10 p-1">
            {['ru', 'kz', 'en'].map(l => (
              <button 
                key={l} 
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${lang === l ? 'bg-[#00E5FF] text-black' : 'text-gray-400 hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <a href="#contact" className="hidden md:block bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#00E5FF] hover:text-black transition-all">{t.navBtn}</a>
        </div>
      </nav>

      {/* Hero */}
      <motion.header initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-3/5 pr-8 text-center md:text-left">
          <div className="inline-block bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest mb-6">
            {t.heroBadge}
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] mb-6">
            {t.heroTitle1} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0047FF]">{t.heroTitle2}</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto md:mx-0">
            {t.heroSub}
          </p>
          <a href="#calc" className="inline-block bg-[#00E5FF] text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]">
            Рассчитать стоимость
          </a>
        </div>
        
        <div className="md:w-2/5 mt-16 md:mt-0 flex justify-center relative perspective-1000">
          <div className="relative w-full h-80 flex items-center justify-center transform rotate-y-[-10deg] rotate-x-[5deg]">
            <div className="relative w-64 h-40 md:w-72 md:h-44 bg-[#151d35] rounded-t-xl border-[6px] border-[#0a0f24] shadow-2xl z-10 flex flex-col p-2 transform -translate-x-4 hover:-translate-y-2 transition-transform duration-500">
              <div className="flex gap-1.5 mb-2 items-center">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div>
                <div className="w-5 h-1.5 bg-gray-600 rounded-full"></div>
              </div>
              <div className="w-full flex-1 bg-gradient-to-br from-[#0047FF] to-black rounded-md border border-gray-700/50"></div>
            </div>
            <div className="absolute bottom-[3.25rem] w-72 md:w-80 h-3 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-xl z-0 transform -translate-x-4"></div>
            <div className="absolute right-0 md:-right-4 bottom-6 z-20 w-20 h-40 md:w-24 md:h-48 bg-[#151d35] rounded-[1.5rem] border-[6px] border-[#0a0f24] shadow-2xl p-1.5 flex flex-col hover:-translate-y-2 transition-transform duration-500">
              <div className="w-1/2 h-1.5 bg-gray-600 rounded-full mx-auto mb-1.5"></div>
              <div className="w-full flex-1 bg-gradient-to-br from-[#00E5FF] to-[#0047FF] rounded-xl"></div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Услуги */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">{t.servicesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Landing Page', desc: 'Одна страница — одна цель. Идеально для рекламы.' },
            { title: 'Корпоративный сайт', desc: 'Солидный имидж, каталог услуг, интеграции.' },
            { title: 'Интернет-магазин', desc: 'Полноценные продажи онлайн с корзиной и оплатой.' }
          ].map((service, i) => (
            <div key={i} className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] hover:border-[#00E5FF]/40 transition-all">
              <h3 className="text-xl font-heading font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Калькулятор стоимости */}
      <motion.section id="calc" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#111830] border border-gray-700 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Бейдж акции */}
          <div className="absolute top-0 right-0 bg-[#00E5FF] text-black text-xs font-bold px-4 py-1 rounded-bl-xl">
            {t.calcBadge}
          </div>

          <h2 className="text-3xl font-heading font-bold mb-8 text-center mt-4">{t.calcTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-400 mb-2">{t.calcType}</label>
              <select 
                onChange={(e) => setCalcType(Number(e.target.value))}
                className="w-full bg-[#0a0f24] border border-gray-600 p-4 rounded-xl text-white focus:outline-none focus:border-[#00E5FF]"
              >
                <option value={35000}>Landing Page (от 35 000 ₸)</option>
                <option value={80000}>Корпоративный сайт (от 80 000 ₸)</option>
                <option value={150000}>Интернет-магазин (от 150 000 ₸)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">{t.calcExtra}</label>
              <select 
                onChange={(e) => setCalcSpeed(Number(e.target.value))}
                className="w-full bg-[#0a0f24] border border-gray-600 p-4 rounded-xl text-white focus:outline-none focus:border-[#00E5FF]"
              >
                <option value={0}>Только базовый функционал</option>
                <option value={10000}>+ Копирайтинг и тексты (10 000 ₸)</option>
                <option value={20000}>+ Интеграция с CRM / WhatsApp (20 000 ₸)</option>
                <option value={25000}>+ Мультиязычность (25 000 ₸)</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-8">
            <div className="text-xl md:text-2xl font-bold mb-4 md:mb-0">
              {t.calcTotal} <span className="text-[#00E5FF]">{calcType + calcSpeed} ₸</span>
            </div>
            <a href="#contact" className="bg-[#00E5FF] text-black font-bold px-8 py-3 rounded-xl hover:bg-white transition-all">
              {t.calcBtn}
            </a>
          </div>
        </div>
      </motion.section>

      {/* Отзывы */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">{t.reviewsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Алия', company: 'Цветочный магазин', text: 'Сделали сайт за 2 недели. Заявки пошли сразу, очень довольны!' },
            { name: 'Данияр', company: 'Стоматология', text: 'Профессиональный подход. Сайт удобный, пациенты записываются онлайн.' },
            { name: 'Марина', company: 'Онлайн-курсы', text: 'Отличный лендинг! Конверсия выросла в 2 раза по сравнению со старым.' }
          ].map((review, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex text-[#00E5FF] mb-4 text-xl">★★★★★</div>
              <p className="text-gray-300 mb-4 text-sm">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00E5FF]/20 flex items-center justify-center font-bold text-[#00E5FF]">{review.name[0]}</div>
                <div>
                  <div className="font-bold text-sm">{review.name}</div>
                  <div className="text-xs text-gray-500">{review.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Форма связи */}
      <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-heading font-bold mb-8">{t.formTitle}</h2>
          
          {success ? (
            <div className="text-center p-6 bg-green-500/10 rounded-2xl border border-green-500/30">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-green-400 font-bold">{t.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <input type="text" placeholder={t.formName} required className="w-full bg-black/30 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00E5FF]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="tel" placeholder={t.formPhone} required className="w-full bg-black/30 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00E5FF]" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <textarea placeholder={t.formMsg} rows="3" required className="w-full bg-black/30 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-[#00E5FF] resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              <button type="submit" disabled={loading} className="w-full bg-[#00E5FF] text-black font-bold text-lg p-4 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] mt-2">
                {loading ? '...' : t.formBtn}
              </button>
            </form>
          )}
        </div>
      </motion.section>

      {/* Подвал */}
      <footer className="relative z-10 border-t border-white/5 py-10 flex flex-col items-center mt-10">
        <div className="mb-4">
          <img src={logo} alt="ARNAU" className="h-16 md:h-20 w-auto opacity-80" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 mb-4 text-sm">
          <a href="tel:+77782631617" className="hover:text-[#00E5FF] transition-colors font-medium">
            +7 778 263 16 17
          </a>
          <span className="hidden md:block">•</span>
          <a href="mailto:info@arnau.kz" className="hover:text-[#00E5FF] transition-colors">
            info@arnau.kz
          </a>
        </div>

        <p className="text-gray-600 text-xs">© {new Date().getFullYear()} ARNAU. Все права защищены.</p>
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