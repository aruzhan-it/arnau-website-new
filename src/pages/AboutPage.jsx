import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Target, Heart, Lightbulb, Code2, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const values = [
    { icon: <Target />, title: 'Фокус на результат', desc: 'Мы создаем сайты не ради красоты, а для решения бизнес-задач.' },
    { icon: <Heart />, title: 'Честность', desc: 'Не обещаем невозможного. Говорим о сроках и ценах прямо.' },
    { icon: <Lightbulb />, title: 'Инновации', desc: 'Используем современные технологии и ИИ для автоматизации.' },
  ]

  const tech = ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'TypeScript', 'Node.js', 'Figma']

  return (
    <>
      <Helmet>
        <title>О компании | ARNAU Digital Agency</title>
        <meta name="description" content="ARNAU — независимая digital-команда из Казахстана. Разрабатываем сайты и веб-приложения для бизнеса." />
      </Helmet>

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/10 text-xs font-semibold tracking-wider text-primary mb-6">
            О КОМПАНИИ
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Мы — <span className="text-primary">ARNAU</span>
          </h1>
          <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
            Независимая digital-команда из Казахстана. Мы верим, что качественный сайт — это не роскошь, а необходимый инструмент для роста любого бизнеса. 
            Наша цель — сделать современные технологии доступными для предпринимателей.
          </p>
        </div>

        {/* Миссия */}
        <div className="bg-surface border border-white/10 rounded-3xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-3">
            <Target className="text-primary" /> Наша миссия
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            Помогать малому и среднему бизнесу расти с помощью профессиональных цифровых решений. 
            Мы создаем сайты, которые привлекают клиентов, экономят время и увеличивают прибыль.
          </p>
        </div>

        {/* Ценности */}
        <h2 className="text-3xl font-heading font-bold mb-8">Наши ценности</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map((v, i) => (
            <div key={i} className="bg-surface border border-white/10 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{v.title}</h3>
              <p className="text-text-muted text-sm">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Технологии */}
        <div className="bg-surface border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
            <Code2 className="text-primary" /> Технологии
          </h2>
          <p className="text-text-muted mb-6">Мы используем современный стек, чтобы сайты были быстрыми и безопасными.</p>
          <div className="flex flex-wrap gap-3">
            {tech.map((t, i) => (
              <span key={i} className="px-4 py-2 bg-bg border border-white/10 rounded-lg text-sm font-medium text-white">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-primary/10 border border-primary/30 rounded-3xl p-10">
          <h2 className="text-3xl font-heading font-bold mb-3">Хотите работать с нами?</h2>
          <p className="text-text-muted mb-6">Обсудим ваш проект и найдем лучшее решение.</p>
          <Link to="/order" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold transition-all">
            Обсудить проект <ArrowRight size={20} />
          </Link>
        </div>
      </main>
    </>
  )
}