import { Link } from 'react-router-dom'

const categories = [
  {
    label: 'Engineering',
    path: '/engineering',
    icon: '⚙️',
    desc: 'B.E / B.Tech colleges',
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    iconBg: 'bg-blue-100',
  },
  {
    label: 'Polytechnic',
    path: '/polytechnic',
    icon: '🔧',
    desc: 'Diploma institutions',
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    iconBg: 'bg-purple-100',
  },
  {
    label: 'Arts & Science',
    path: '/arts-and-science',
    icon: '🎨',
    desc: 'Liberal arts & science colleges',
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
    iconBg: 'bg-green-100',
  },
  {
    label: 'Nursing',
    path: '/nursing',
    icon: '🏥',
    desc: 'Medical & nursing colleges',
    color: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
    iconBg: 'bg-pink-100',
  },
  {
    label: 'Research Jobs',
    path: '/research-jobs',
    icon: '🔬',
    desc: 'R&D and research institutes',
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    iconBg: 'bg-orange-100',
  },
  {
    label: 'School Jobs',
    path: '/school-jobs',
    icon: '📚',
    desc: 'Schools and K-12 education',
    color: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
    iconBg: 'bg-teal-100',
  },
]

const stats = [
  { value: '500+', label: 'Active Institutions' },
  { value: '2000+', label: 'Job Listings' },
  { value: '50K+', label: 'Educators Placed' },
  { value: '6', label: 'Job Categories' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="inline-block bg-blue-500 bg-opacity-50 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            India's Premier Faculty Recruitment Portal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Connect Faculty Talent<br className="hidden sm:block" /> with Top Institutions
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            Browse thousands of teaching and research opportunities across engineering, arts, science, nursing and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/engineering" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors text-sm">
              Browse Jobs
            </Link>
            <Link to="/post-job" className="bg-blue-500 bg-opacity-60 hover:bg-opacity-80 text-white font-semibold px-8 py-3 rounded-lg border border-white border-opacity-30 transition-colors text-sm">
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Browse by Category</h2>
          <p className="text-gray-500 text-sm">Find opportunities tailored to your field of expertise</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.path}
              to={cat.path}
              className={`flex items-center gap-4 p-5 rounded-xl border ${cat.color} transition-all duration-200 group`}
            >
              <div className={`w-12 h-12 ${cat.iconBg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                {cat.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{cat.label}</div>
                <div className="text-sm text-gray-500 mt-0.5">{cat.desc}</div>
              </div>
              <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Hiring Faculty?</h2>
          <p className="text-blue-100 mb-7 text-sm">Post your recruitment requirement and reach thousands of qualified educators across India.</p>
          <Link to="/post-job" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors text-sm inline-block">
            Post a Job Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p className="font-semibold text-white text-base mb-1">FacultyPlus</p>
          <p>India's trusted faculty recruitment portal &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
