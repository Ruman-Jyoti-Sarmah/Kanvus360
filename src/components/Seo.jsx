import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../config/site'

/**
 * Lightweight SEO helper — updates title + meta description per route.
 * (For a real build, pair with react-helmet-async or a head manager.)
 */
export default function Seo({ title, description }) {
  const location = useLocation()

  useEffect(() => {
    document.title = title
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    setMeta('description', description)
    // Open Graph
    setMeta('og:title', title)
    setMeta('og:site_name', siteConfig.companyName)
    setMeta('og:description', description)
    setMeta('og:url', siteConfig.baseUrl + location.pathname)
  }, [title, description, location.pathname])

  return null
}