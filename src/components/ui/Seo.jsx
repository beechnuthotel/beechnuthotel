import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, SITE_NAME, ROUTE_SEO, FALLBACK_SEO } from '../../data/seo'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const route =
      ROUTE_SEO.find(r => !r.prefix && r.path === pathname) ??
      ROUTE_SEO.find(r => r.prefix && pathname.startsWith(r.path)) ??
      FALLBACK_SEO

    document.title = route.title
    setMeta('name', 'description', route.description)
    setMeta('name', 'keywords', route.keywords.join(', '))
    setMeta('property', 'og:title', route.title)
    setMeta('property', 'og:description', route.description)
    setMeta('property', 'og:url', `${SITE}${pathname}`)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_NG')
    setMeta('name', 'twitter:title', route.title)
    setMeta('name', 'twitter:description', route.description)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setCanonical(`${SITE}${pathname === '/' ? '/' : pathname}`)
  }, [pathname])

  return null
}
