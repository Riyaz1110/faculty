import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const engineeringSubCategories = [
  "Architecture Faculty Job", "Aeronautical Faculty Jobs", "Automobile Faculty Job",
  "Agricultural Engineering", "BME Faculty Job", "Civil Faculty Job",
  "Chemical Engg Faculty Job", "CSE Faculty Job", "EEE Faculty Job",
  "ECE Faculty Job", "EIE Faculty Job", "Mechanical Faculty Job",
  "MBA Faculty Jobs", "MCA Faculty Job", "Science and Humanities",
  "View All Departments"
]

const categories = [
  {
    label: 'Engineering',
    subCategories: engineeringSubCategories.map(sub => ({
      label: sub,
      path: sub === "View All Departments" ? `/engineering` : `/search?cat=Engineering&sub=${encodeURIComponent(sub)}`
    }))
  },
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
  const [openDropdown, setOpenDropdown] = useState(null) // For mobile dropdown

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

          <div className="hidden md:flex items-center space-x-1 relative">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              Home
            </Link>
            <Link to="/search" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/search') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              Search Jobs
            </Link>

            {categories.map((cat) => {
              if (cat.subCategories) {
                return (
                  <div key={cat.label} className="group relative inline-block">
                    <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-1 transition-colors">
                      {cat.label}
                      <svg className="w-3 h-3 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white border border-gray-100 rounded-lg shadow-lg py-2 max-h-[70vh] overflow-y-auto">
                        {cat.subCategories.map((sub, i) => (
                          <Link
                            key={i}
                            to={sub.path}
                            className={`block px-4 py-2 text-xs font-medium ${sub.label === 'View All Departments' ? 'text-blue-600 border-t mt-1 border-gray-50 hover:bg-blue-50' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'}`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={cat.path}
                  to={cat.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(cat.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  {cat.label}
                </Link>
              )
            })}
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
        <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 space-y-1 overflow-y-auto max-h-[80vh]">
          <Link to="/" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/search" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Search Jobs</Link>

          {categories.map((cat) => {
            if (cat.subCategories) {
              return (
                <div key={cat.label} className="border-b border-gray-50 pb-1 mb-1">
                  <button
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center"
                    onClick={() => setOpenDropdown(openDropdown === cat.label ? null : cat.label)}
                  >
                    {cat.label}
                    <svg className={`w-4 h-4 transition-transform ${openDropdown === cat.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {openDropdown === cat.label && (
                    <div className="pl-6 space-y-1 py-1">
                      {cat.subCategories.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          className="block px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded"
                          onClick={() => setMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link key={cat.path} to={cat.path} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                {cat.label}
              </Link>
            )
          })}

          <Link to="/post-job" className="block px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 mt-2" onClick={() => setMenuOpen(false)}>Post a Job</Link>
          {!isAdmin && <Link to="/admin/login" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Admin Login</Link>}
        </div>
      )}
    </nav>
  )
}
