import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react'

export default function OrderPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    service_type: 'Landing Page',
    business_info: '',
    features: [],
    budget: 'До 100 000 ₸',
    deadline: 'Стандарт (2-3 недели)',
    name: '',
    phone: '',
    email: ''
  })

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Отправляем в Supabase
    const { error } = await supabase.from('leads').insert([{
      name: formData.name,
      phone: formData.phone,
      message: `Услуга: ${formData.service_type}\nБизнес: ${formData.business_info}\nФункции: ${formData.features.join(', ')}\nБюджет: ${formData.budget}\nСроки: ${formData.deadline}\nEmail: ${formData.email}`,
      service_type: formData.service_type,
      budget: formData.budget,
      deadline: formData.deadline
    }])

    if (!error) {
      setSuccess(true)
    } else {
      alert('Ошибка отправки. Попробуйте позже.')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="pt-40 pb-20 px-6 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-heading font-bold mb-4">Заявка принята!</h2>
        <p className="text-text-muted">Мы свяжемся с вами в течение 15 минут.</p>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Оформление заказа | ARNAU</title></Helmet>
      <main className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-8 text-center">Обсудим ваш проект</h1>
        
        {/* Прогресс-бар */}
        <div className="flex items-center justify-between mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= i ? 'bg-primary text-white' : 'bg-surface text-text-muted border border-white/10'}`}>
                {i}
              </div>
              {i < 5 && <div className={`hidden sm:block w-12 h-1 mx-2 rounded ${step > i ? 'bg-primary' : 'bg-surface'}`}></div>}
            </div>
          ))}
        </div>

        <div className="bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold mb-6">Что вам нужно разработать?</h2>
                <select value={formData.service_type} onChange={e => setFormData({...formData, service_type: e.target.value})} className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none mb-6">
                  <option>Landing Page</option>
                  <option>Корпоративный сайт</option>
                  <option>Интернет-магазин</option>
                  <option>Веб-приложение</option>
                </select>
                <button onClick={nextStep} className="w-full bg-primary py-4 rounded-xl font-bold flex justify-center items-center gap-2">Далее <ChevronRight size={18} /></button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold mb-6">Расскажите о бизнесе</h2>
                <textarea placeholder="Чем занимается ваша компания?" value={formData.business_info} onChange={e => setFormData({...formData, business_info: e.target.value})} rows="4" className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none mb-6" />
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 bg-transparent border border-white/10 py-4 rounded-xl font-bold flex justify-center items-center gap-2"><ChevronLeft size={18} /> Назад</button>
                  <button onClick={nextStep} className="flex-[2] bg-primary py-4 rounded-xl font-bold flex justify-center items-center gap-2">Далее <ChevronRight size={18} /></button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold mb-6">Необходимый функционал</h2>
                <div className="space-y-2 mb-6">
                  {['Онлайн-оплата', 'Личный кабинет', 'Админ-панель', 'Интеграция CRM', 'SEO'].map(f => (
                    <label key={f} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-white/5 cursor-pointer">
                      <input type="checkbox" onChange={(e) => {
                        const newFeats = e.target.checked ? [...formData.features, f] : formData.features.filter(x => x !== f)
                        setFormData({...formData, features: newFeats})
                      }} className="w-5 h-5 accent-primary" />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 bg-transparent border border-white/10 py-4 rounded-xl font-bold">Назад</button>
                  <button onClick={nextStep} className="flex-[2] bg-primary py-4 rounded-xl font-bold">Далее</button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold mb-6">Бюджет и сроки</h2>
                <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white mb-4 outline-none">
                  <option>До 100 000 ₸</option>
                  <option>100 000 - 300 000 ₸</option>
                  <option>300 000 - 500 000 ₸</option>
                  <option>Более 500 000 ₸</option>
                </select>
                <select value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white mb-6 outline-none">
                  <option>Стандарт (2-3 недели)</option>
                  <option>Срочно (1 неделя)</option>
                  <option>Не спешу</option>
                </select>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 bg-transparent border border-white/10 py-4 rounded-xl font-bold">Назад</button>
                  <button onClick={nextStep} className="flex-[2] bg-primary py-4 rounded-xl font-bold">Далее</button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.form key="step5" onSubmit={handleSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold mb-6">Контактные данные</h2>
                <div className="space-y-4 mb-6">
                  <input type="text" placeholder="Ваше имя" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white outline-none" />
                  <input type="tel" placeholder="Телефон / WhatsApp" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white outline-none" />
                  <input type="email" placeholder="Email (необязательно)" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white outline-none" />
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={prevStep} className="flex-1 bg-transparent border border-white/10 py-4 rounded-xl font-bold">Назад</button>
                  <button type="submit" disabled={loading} className="flex-[2] bg-primary py-4 rounded-xl font-bold">
                    {loading ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </div>
              </motion.form>
            )}

          </AnimatePresence>
        </div>
      </main>
    </>
  )
}