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
      <section className="relative min-h-[80vh] flex items-center justify-center text-white overflow-hidden">

  {/* 🌄 Background Image */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
      className="w-full h-full object-cover"
      alt="hero"
    />
  </div>

  {/* 🌫️ Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/60 to-black/70"></div>

  {/* ✨ Glass Content */}
  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

    {/* Badge */}
    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-wide">
      INDIA'S PREMIER FACULTY RECRUITMENT PORTAL
    </div>

    {/* Title */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
      Connect Faculty Talent <br className="hidden sm:block" />
      with Top Institutions
    </h1>

    {/* Subtitle */}
    <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
      Browse thousands of teaching and research opportunities across engineering, arts,
      science, nursing and more.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-4">

      <Link
        to="/engineering"
        className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:bg-gray-100 transition-all"
      >
        Browse Jobs
      </Link>

      <Link
        to="/post-job"
        className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-xl hover:bg-white/20 transition-all"
      >
        Post a Job
      </Link>

    </div>

  </div>

  {/* ✨ Bottom fade effect */}
  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>

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
      <section className="relative py-16 text-white overflow-hidden">

  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

    <h2 className="text-3xl font-bold mb-3">
      Hiring Faculty?
    </h2>

    <p className="text-gray-300 mb-8">
      Post your recruitment requirement and reach thousands of qualified educators across India.
    </p>

    <Link
      to="/post-job"
      className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-xl hover:bg-white/20 transition-all"
    >
      Post a Job Now
    </Link>

  </div>

</section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p className="font-semibold text-white text-base mb-1">CampusHire</p>
          <p>India's trusted faculty recruitment portal &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
