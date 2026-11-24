import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabaseClient'
import { Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('leads').insert([{
      name: formData.name,
      phone: formData.phone,
      message: formData.message || 'Заявка со страницы контактов',
      service_type: 'Контактная форма'
    }])
    if (!error) {
      setSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
    } else {
      alert('Ошибка: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Контакты | ARNAU Digital Agency</title>
        <meta name="description" content="Свяжитесь с ARNAU. Разработка сайтов и веб-приложений в Казахстане. WhatsApp, Telegram, Email." />
      </Helmet>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/10 text-xs font-semibold tracking-wider text-primary mb-6">
            СВЯЗАТЬСЯ С НАМИ
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Давайте обсудим ваш проект</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Отвечаем в течение 15 минут в рабочее время. Выберите удобный способ связи или оставьте заявку.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Контакты */}
          <div className="space-y-4">
            <a 
              href="https://wa.me/77782631617" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 p-6 bg-surface border border-white/10 rounded-2xl hover:border-green-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
              <div>
                <div className="text-sm text-text-muted">WhatsApp</div>
                <div className="text-lg font-bold text-white">+7 778 263 16 17</div>
              </div>
            </a>

            <a 
              href="tel:+77782631617" 
              className="flex items-center gap-4 p-6 bg-surface border border-white/10 rounded-2xl hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-sm text-text-muted">Телефон</div>
                <div className="text-lg font-bold text-white">+7 778 263 16 17</div>
              </div>
            </a>

            <a 
              href="mailto:info@arnau.kz" 
              className="flex items-center gap-4 p-6 bg-surface border border-white/10 rounded-2xl hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-sm text-text-muted">Email</div>
                <div className="text-lg font-bold text-white">info@arnau.kz</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-6 bg-surface border border-white/10 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Send size={24} />
              </div>
              <div>
                <div className="text-sm text-text-muted">Telegram</div>
                <div className="text-lg font-bold text-white">@arnau_digital</div>
              </div>
            </div>
          </div>

          {/* Форма */}
          <div className="bg-surface border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-heading font-bold mb-6">Оставьте заявку</h2>
            
            {success ? (
              <div className="text-center p-8 bg-green-500/10 rounded-2xl border border-green-500/30">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Заявка отправлена!</h3>
                <p className="text-text-muted text-sm">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Ваше имя</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-colors" 
                    placeholder="Аружан"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Телефон / WhatsApp</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-colors" 
                    placeholder="+7 700 000 00 00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Сообщение (необязательно)</label>
                  <textarea 
                    rows="4"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-colors resize-none" 
                    placeholder="Кратко о вашей задаче"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {loading ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  )
}