import { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  ru: {
    nav: { home: 'Главная', services: 'Услуги', portfolio: 'Портфолио', about: 'О нас', pricing: 'Стоимость', contact: 'Контакты' },
    hero: {
      badge: 'ARNAU DIGITAL AGENCY',
      title: 'Создаём сайты, которые развивают ваш бизнес',
      subtitle: 'ARNAU — независимая digital-команда. Разрабатываем современные, быстрые и функциональные сайты, которые помогают бизнесу привлекать клиентов и масштабироваться.',
      ctaPrimary: 'Обсудить проект',
      ctaSecondary: 'Смотреть работы'
    }
  },
  kz: {
    nav: { home: 'Басты бет', services: 'Қызметтер', portfolio: 'Портфолио', about: 'Біз туралы', pricing: 'Бағалар', contact: 'Байланыс' },
    hero: {
      badge: 'ARNAU DIGITAL AGENCY',
      title: 'Бизнесіңізді өркендететін сайттар жасаймыз',
      subtitle: 'ARNAU — тәуелсіз digital-команда. Клиенттерді тартуға және бизнесті масштабтауға көмектесетін заманауи, жылдам және функционалды сайттарды әзірлейміз.',
      ctaPrimary: 'Жобаны талқылау',
      ctaSecondary: 'Жұмыстарды көру'
    }
  },
  en: {
    nav: { home: 'Home', services: 'Services', portfolio: 'Portfolio', about: 'About', pricing: 'Pricing', contact: 'Contact' },
    hero: {
      badge: 'ARNAU DIGITAL AGENCY',
      title: 'We build websites that grow your business',
      subtitle: 'ARNAU is an independent digital team. We develop modern, fast, and functional websites that help businesses attract clients and scale.',
      ctaPrimary: 'Discuss project',
      ctaSecondary: 'View our work'
    }
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('arnau_lang') || 'ru')
  
  useEffect(() => {
    localStorage.setItem('arnau_lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)