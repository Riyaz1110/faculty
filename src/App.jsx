import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import PostJob from './pages/PostJob'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import CategoryPage from './pages/CategoryPage'

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/engineering" element={<CategoryPage />} />
        <Route path="/polytechnic" element={<CategoryPage />} />
        <Route path="/arts-and-science" element={<CategoryPage />} />
        <Route path="/nursing" element={<CategoryPage />} />
        <Route path="/research-jobs" element={<CategoryPage />} />
        <Route path="/school-jobs" element={<CategoryPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: { fontSize: '14px', borderRadius: '10px' },
          }}
        />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
