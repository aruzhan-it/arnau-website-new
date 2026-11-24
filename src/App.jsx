import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import logo from './logo2.png'

// Импорт всех страниц
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CalculatorPage from './pages/CalculatorPage'
import OrderPage from './pages/OrderPage'

// ==========================================
// 1. КОМПОНЕНТ ШАПКИ (НАВИГАЦИЯ)
// ==========================================
function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/portfolio', label: t.nav.portfolio },
    { path: '/about', label: t.nav.about },
    { path: '/pricing', label: t.nav.pricing },
    { path: '/contact', label: t.nav.contact },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ARNAU" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-primary' : 'text-text-muted hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-surface rounded-full p-1 border border-white/5">
            {['kz', 'ru', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-xs font-bold uppercase rounded-full transition-all ${lang === l ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <Link to="/order" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
            Заказать проект
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Меню">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium ${location.pathname === item.path ? 'text-primary' : 'text-text-muted'}`}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-white/5" />
              <div className="flex gap-2 bg-bg p-1 rounded-full w-max mb-2">
                {['kz', 'ru', 'en'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-2 text-xs font-bold uppercase rounded-full transition-all ${lang === l ? 'bg-primary text-white' : 'text-text-muted'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <Link to="/order" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center py-3 rounded-xl font-semibold">
                Заказать проект
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ==========================================
// 2. ГЛАВНАЯ СТРАНИЦА (HERO)
// ==========================================
function HomePage() {
  const { t } = useLanguage()

  return (
    <main className="pt-32 pb-20 relative overflow-hidden">
      {/* Фоновое свечение */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/10 text-xs font-semibold tracking-wider text-primary mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {t.hero.badge}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] mb-6"
          >
            {t.hero.title.split(' ').map((word, i) => (
              <span key={i} className={word === 'развивают' || word === 'өркендететін' || word === 'grow' ? 'text-primary' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/order" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              {t.hero.ctaPrimary}
              <ArrowRight size={20} />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center justify-center bg-surface hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold transition-all">
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

// ==========================================
// 3. ГЛАВНЫЙ КОМПОНЕНТ (APP)
// ==========================================
export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-bg text-text-main selection:bg-primary selection:text-white flex flex-col">
            
            {/* Плавающая кнопка WhatsApp */}
            <a 
              href="https://wa.me/77782631617" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Написать в WhatsApp"
              className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center"
            >
              <MessageCircle size={28} />
            </a>

            <Navbar />

            {/* Контент страниц */}
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/portfolio/:id" element={<ProjectPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/pricing" element={<CalculatorPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/order" element={<OrderPage />} />
              </Routes>
            </div>

            {/* Глобальный подвал */}
            <footer className="border-t border-white/5 py-10 px-6 mt-auto">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="ARNAU" className="h-10 w-auto opacity-80" />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-text-muted">
                  <a href="https://wa.me/77782631617" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <a href="tel:+77782631617" className="hover:text-white transition-colors">
                    +7 778 263 16 17
                  </a>
                  <a href="mailto:info@arnau.kz" className="hover:text-white transition-colors">
                    info@arnau.kz
                  </a>
                </div>
                <p className="text-xs text-text-muted">© {new Date().getFullYear()} ARNAU. Все права защищены.</p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  )
}