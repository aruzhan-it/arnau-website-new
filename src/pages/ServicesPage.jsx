import { Helmet } from 'react-helmet-async'
import { Code2, ShoppingCart, Layout, Smartphone, PenTool, RefreshCw, Search, Wrench, Database, Bot, Zap } from 'lucide-react'

const services = [
  { icon: <Layout />, title: 'Landing Page', desc: 'Одностраничные сайты для быстрых продаж.' },
  { icon: <Code2 />, title: 'Корпоративные сайты', desc: 'Солидный имидж и каталог услуг для компаний.' },
  { icon: <ShoppingCart />, title: 'Интернет-магазины', desc: 'Полноценные e-commerce решения с оплатой.' },
  { icon: <Smartphone />, title: 'Веб-приложения', desc: 'Сложные сервисы и личные кабинеты.' },
  { icon: <PenTool />, title: 'UI/UX дизайн', desc: 'Проектирование удобных интерфейсов.' },
  { icon: <RefreshCw />, title: 'Редизайн', desc: 'Обновление устаревших сайтов.' },
  { icon: <Search />, title: 'SEO-оптимизация', desc: 'Вывод сайта в топ поисковых систем.' },
  { icon: <Wrench />, title: 'Техподдержка', desc: 'Обслуживание и обновление проектов.' },
  { icon: <Database />, title: 'Интеграция CRM', desc: 'Связка сайта с системами продаж.' },
  { icon: <Zap />, title: 'Автоматизация', desc: 'Упрощение бизнес-процессов.' },
  { icon: <Bot />, title: 'Интеграция ИИ', desc: 'Умные чат-боты и нейросети на сайте.' },
]

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Услуги | ARNAU Digital</title>
      </Helmet>
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Наши услуги</h1>
        <p className="text-text-muted text-lg mb-12 max-w-2xl">Полный цикл разработки: от идеи и дизайна до запуска и поддержки.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-surface border border-white/5 hover:border-primary/50 transition-colors duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}