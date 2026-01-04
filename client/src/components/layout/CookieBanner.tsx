'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/buttons'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya aceptó las cookies
    const cookiesAccepted = localStorage.getItem('cookies-accepted')
    if (!cookiesAccepted) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true')
    setShowBanner(false)
    
    // Aquí puedes activar Google Analytics u otros scripts
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }

  const rejectCookies = () => {
    localStorage.setItem('cookies-accepted', 'false')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              🍪 Usamos cookies para mejorar tu experiencia en nuestro sitio web y analizar el tráfico. 
              Al hacer clic en "Aceptar", aceptas nuestro uso de cookies.{' '}
              <a 
                href="/terminos-de-uso" 
                className="text-primary-600 hover:underline font-medium"
              >
                Más información
              </a>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="secondary"
              onClick={rejectCookies}
              className="px-6 py-2 text-sm"
            >
              Rechazar
            </Button>
            <Button
              variant="primary"
              onClick={acceptCookies}
              className="px-6 py-2 text-sm"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
