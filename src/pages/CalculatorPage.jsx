import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function CalculatorPage() {
  const [base, setBase] = useState(50000)
  const [pages, setPages] = useState(1)
  const [options, setOptions] = useState({ design: false, payment: false, auth: false, crm: false, ai: false, seo: false })
  const [urgency, setUrgency] = useState(1)

  const prices = { design: 50000, payment: 30000, auth: 40000, crm: 40000, ai: 60000, seo: 30000 }
  const pagePrice = 10000

  const calculateTotal = () => {
    let total = base + (pages > 1 ? (pages - 1) * pagePrice : 0)
    Object.keys(options).forEach(key => {
      if (options[key]) total += prices[key]
    })
    return Math.round((total * urgency) / 1000) * 1000 // Округление
  }

  const toggleOption = (opt) => setOptions(prev => ({ ...prev, [opt]: !prev[opt] }))

  return (
    <>
      <Helmet><title>Калькулятор стоимости | ARNAU</title></Helmet>
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold mb-8 text-center">Рассчитайте ваш проект</h1>
        
        <div className="bg-surface border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Тип сайта</label>
                <select onChange={(e) => setBase(Number(e.target.value))} className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none">
                  <option value={50000}>Landing Page (50 000 ₸)</option>
                  <option value={150000}>Корпоративный (150 000 ₸)</option>
                  <option value={300000}>Интернет-магазин (300 000 ₸)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Количество страниц (кроме главной)</label>
                <input type="number" min="0" max="50" value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Срочность</label>
                <select onChange={(e) => setUrgency(Number(e.target.value))} className="w-full bg-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none">
                  <option value={1}>Стандартные сроки (x1)</option>
                  <option value={1.3}>Ускоренно (x1.3)</option>
                  <option value={1.7}>Очень срочно (x1.7)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-muted mb-2">Дополнительно</label>
              {[
                { id: 'design', label: 'Индивидуальный дизайн' },
                { id: 'payment', label: 'Онлайн-оплата' },
                { id: 'auth', label: 'Личный кабинет' },
                { id: 'crm', label: 'Интеграция CRM' },
                { id: 'ai', label: 'Искусственный интеллект' },
                { id: 'seo', label: 'SEO-оптимизация' },
              ].map(opt => (
                <label key={opt.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10">
                  <input type="checkbox" checked={options[opt.id]} onChange={() => toggleOption(opt.id)} className="w-5 h-5 accent-primary" />
                  <span className="text-sm">{opt.label}</span>
                  <span className="ml-auto text-xs text-primary font-mono">+{prices[opt.id].toLocaleString()} ₸</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-text-muted mb-1">Ориентировочная стоимость:</p>
              <p className="text-4xl font-heading font-bold text-primary">{calculateTotal().toLocaleString()} ₸</p>
            </div>
            <Link to="/order" className="w-full md:w-auto text-center bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold transition-all">
              Оформить заявку
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}