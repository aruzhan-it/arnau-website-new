import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabaseClient'
import { motion } from 'framer-motion'
import { ArrowUpRight, Filter } from 'lucide-react'

const CATEGORIES = ['Все', 'Landing', 'Корпоративный', 'E-commerce', 'Web App']

// Палитра для карточек-заглушек (по категориям)
const CATEGORY_COLORS = {
  'Landing': 'from-orange-500/40 via-red-500/20 to-bg',
  'Корпоративный': 'from-blue-500/40 via-indigo-500/20 to-bg',
  'E-commerce': 'from-green-500/40 via-emerald-500/20 to-bg',
  'Web App': 'from-purple-500/40 via-pink-500/20 to-bg',
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Все')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false })
    if (data) setProjects(data)
    setLoading(false)
  }

  const filtered = filter === 'Все' ? projects : projects.filter(p => p.category === filter)

  return (
    <>
      <Helmet>
        <title>Портфолио | ARNAU — Разработка сайтов в Казахстане</title>
        <meta name="description" content="Примеры работ и концепты сайтов ARNAU. Лендинги, корпоративные сайты, интернет-магазины и веб-приложения." />
      </Helmet>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/10 text-xs font-semibold tracking-wider text-primary mb-6">
            НАШИ РАБОТЫ
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 max-w-3xl">
            Идеи, которые мы <span className="text-primary">воплощаем</span>
          </h1>
          <p className="text-text-muted text-lg mb-10 max-w-2xl">
            Ниже — концепты и дизайн-исследования, которые мы создали, чтобы показать наши подходы к разным типам бизнеса. Скоро здесь появятся реальные кейсы наших клиентов.
          </p>
        </motion.div>

        {/* Фильтры */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          <Filter size={18} className="text-text-muted shrink-0 mr-2" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-text-muted hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Сетка проектов */}
        {loading ? (
          <div className="text-center py-20 text-text-muted">Загружаем проекты...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to={`/portfolio/${project.id}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-surface">
                    {/* Градиент-заглушка (если нет картинки) */}
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_COLORS[project.category] || 'from-primary/30 to-bg'} flex items-center justify-center relative`}>
                        <div className="text-4xl md:text-6xl font-heading font-bold text-white/30 text-center px-6">
                          {project.title}
                        </div>
                      </div>
                    )}

                    {/* Бейдж "Концепт" */}
                    {project.is_concept && (
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                        КОНЦЕПТ
                      </div>
                    )}

                    {/* Стрелка */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={20} className="text-white" />
                    </div>
                  </div>

                  <div className="mt-4 px-2 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-text-muted mt-1 line-clamp-2">{project.description}</p>
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {project.category}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            В этой категории пока нет проектов.
          </div>
        )}
      </main>
    </>
  )
}