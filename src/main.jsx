import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { seedCatalogVans } from './seedCatalog'

if (import.meta.env.DEV) {
    seedCatalogVans().catch((err) => {
        console.warn('Catalog seed skipped:', err.message)
    })
}

import { ThemeProvider } from './components/Theme.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
