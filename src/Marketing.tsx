
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { StudioApp } from './App'
import { Overview } from './pages/Overview'
import { Pricing } from './pages/Pricing'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Contact } from './pages/Contact'
import { AuthGuard } from './components/AuthGuard'
import { MarketingLayout } from './components/Layout'
import { ScrollToTop } from './components/ScollToTop'

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        {/* Studio routes — require authentication */}
        <Route
          path="/studio/*"
          element={
            <AuthGuard>
              <StudioApp />
            </AuthGuard>
          }
        />

        {/* Marketing routes — public */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
