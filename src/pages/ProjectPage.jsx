import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabaseClient'
import { ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react'

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
    window.scrollTo(0, 0)
  }, [id])

  const fetchProject = async () => {
    const { data, error } = await supabase.from('portfolio').select('*').eq('id', id).single()
    if (!error) setProject(data)
    setLoading(false)
  }

  if (loading) return <div className="pt-40 text-center text-text-muted">Загрузка...</div>
  if (!project) return <div className="pt-40 text-center text-text-muted">Проект не найден. <Link to="/portfolio" className="text-primary">Вернуться в портфолио</Link></div>

  return (
    <>
      <Helmet>
        <title>{project.title} | Портфолио ARNAU</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-8">
          <ArrowLeft size={18} /> Все проекты
        </Link>

        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {project.category}
            </span>
            {project.is_concept && (
              <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full flex items-center gap-1">
                <AlertCircle size={12} /> Концепт
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-text-muted max-w-3xl">{project.description}</p>
        </div>

        {/* Изображение */}
        <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 mb-12 bg-surface">
          {project.image_url ? (
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-bg flex items-center justify-center">
              <div className="text-6xl md:text-8xl font-heading font-bold text-white/20">{project.title}</div>
            </div>
          )}
        </div>

        {/* Информация */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-surface border border-white/10 rounded-2xl p-6">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Категория</div>
            <div className="text-lg font-bold">{project.category}</div>
          </div>
          <div className="bg-surface border border-white/10 rounded-2xl p-6">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Статус</div>
            <div className="text-lg font-bold">{project.is_concept ? 'Концепт-дизайн' : 'Реальный проект'}</div>
          </div>
          <div className="bg-surface border border-white/10 rounded-2xl p-6">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Дата</div>
            <div className="text-lg font-bold">{new Date(project.created_at).toLocaleDateString('ru-RU')}</div>
          </div>
        </div>

        {/* Ссылка на живой проект */}
        {project.project_url && (
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold mb-1">Посмотреть живой проект</div>
              <div className="text-sm text-text-muted">Сайт доступен по ссылке</div>
            </div>
            <a 
              href={project.project_url} 
              target="_blank" 
              rel="noreferrer"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all"
            >
              Открыть сайт <ExternalLink size={16} />
            </a>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center bg-surface border border-white/10 rounded-3xl p-10">
          <h2 className="text-3xl font-heading font-bold mb-3">Хотите похожий проект?</h2>
          <p className="text-text-muted mb-6">Обсудим вашу задачу и предложим решение.</p>
          <Link to="/order" className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold transition-all">
            Обсудить проект
          </Link>
        </div>
      </main>
    </>
  )
}