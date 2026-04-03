import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const categories = [
  { label: 'Engineering', path: '/engineering' },
  { label: 'Polytechnic', path: '/polytechnic' },
  { label: 'Arts & Science', path: '/arts-and-science' },
  { label: 'Nursing', path: '/nursing' },
  { label: 'Research Jobs', path: '/research-jobs' },
  { label: 'School Jobs', path: '/school-jobs' },
]

export default function Navbar() {
  const { isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">CampusHire</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              Home
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(cat.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/post-job" className="hidden md:inline-flex btn-primary text-sm">
              Post a Job
            </Link>
            {isAdmin ? (
              <div className="flex items-center space-x-2">
                <Link to="/admin/dashboard" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/admin/login" className="hidden md:inline-flex text-sm text-gray-500 hover:text-gray-700">
                Admin
              </Link>
            )}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Home</Link>
          {categories.map((cat) => (
            <Link key={cat.path} to={cat.path} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              {cat.label}
            </Link>
          ))}
          <Link to="/post-job" className="block px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50" onClick={() => setMenuOpen(false)}>Post a Job</Link>
          {!isAdmin && <Link to="/admin/login" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Admin Login</Link>}
        </div>
      )}
    </nav>
  )
}
