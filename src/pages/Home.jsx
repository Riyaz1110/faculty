import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import JobCard from '../components/JobCard'

const indianStates = [
  "All Locations",
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
]

export default function Home() {
  const navigate = useNavigate()

  // Search state
  const [keyword, setKeyword] = useState('')
  const [locationStr, setLocationStr] = useState('')

  // Jobs state
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedJobs()
  }, [])

  const fetchFeaturedJobs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(6)

    if (!error && data) {
      setFeaturedJobs(data)
    }
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.append('q', keyword)
    if (locationStr && locationStr !== 'All Locations') params.append('loc', locationStr)

    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Hero Search Section */}
      <section
        className="relative py-32 px-4 flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3)' }}
      >
        {/* Subtle dark overlay so text stays readable but image is fully visible */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Gradient fade to gray-50 at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto pt-8 pb-12">
          {/* Unique Heading with Green Accent */}
          <h1 className="text-4xl md:text-[3.25rem] font-bold text-white mb-10 tracking-tight leading-tight drop-shadow-lg">
            Discover your <span className="text-[#64b52f] drop-shadow-none">ideal</span> academic role
          </h1>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-0 shadow-[0_4px_20px_rgb(0,0,0,0.08)] rounded bg-white">
              <div className="flex-[3] relative border-b md:border-b-0 md:border-r border-gray-200">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter job title or company name"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-t md:rounded-l md:rounded-tr-none bg-white text-gray-800 placeholder-gray-500 focus:outline-none text-[15px]"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="flex-[2] relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <select
                  className="w-full pl-11 pr-10 py-3.5 bg-white text-gray-800 focus:outline-none text-[15px] appearance-none"
                  value={locationStr}
                  onChange={(e) => setLocationStr(e.target.value)}
                >
                  <option value="">State (Optional)</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#64b52f] hover:bg-[#58a129] text-white font-bold py-3.5 px-8 rounded-b md:rounded-bl-none md:rounded-r transition text-[16px] md:ml-1"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 gap-8">

        {/* Left Column (Featured Jobs) */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
            <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
            <Link to="/search" className="text-violet-600 hover:text-violet-800 font-medium text-sm">View All Jobs &rarr;</Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <svg className="animate-spin w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : featuredJobs.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-500">No jobs listed yet. Be the first to post a job!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar (Optional Widgets / Career Advice) */}
        <div className="w-full md:w-80 flex flex-col gap-8">

          {/* Post A Job Widget */}
          <div className="bg-violet-50 rounded-xl p-6 border border-violet-100 text-center shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Employers</h3>
            <p className="text-sm text-gray-600 mb-4">Post your recruitment requirement and reach thousands of qualified educators across India.</p>
            <Link to="/post-job" className="inline-block bg-violet-600 text-white px-6 py-2 rounded font-bold hover:bg-violet-700 transition w-full shadow-md">
              Post Jobs
            </Link>
          </div>

          {/* Career Advice Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Career Advice</h2>

            <Link to="/article/1" className="group flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-2 -mx-2 rounded transition">
              <div className="w-20 h-20 bg-gray-200 rounded object-cover flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=300&h=300&fit=crop" alt="Article 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2 leading-snug">How to Ace Your Academic Interview in 5 Steps</h4>
                <p className="text-xs text-gray-500 mt-1">By CampusHire Team</p>
              </div>
            </Link>

            <Link to="/article/2" className="group flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-2 -mx-2 rounded transition">
              <div className="w-20 h-20 bg-gray-200 rounded object-cover flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=300&fit=crop" alt="Article 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2 leading-snug">Building a Strong Research Portfolio</h4>
                <p className="text-xs text-gray-500 mt-1">By Dr. Smith</p>
              </div>
            </Link>

            <Link to="/article/3" className="group flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-2 -mx-2 rounded transition">
              <div className="w-20 h-20 bg-gray-200 rounded object-cover flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=300&fit=crop" alt="Article 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2 leading-snug">Resume Tips for First-Time Teachers</h4>
                <p className="text-xs text-gray-500 mt-1">By CampusHire Team</p>
              </div>
            </Link>

            <Link to="#" className="text-violet-600 text-sm font-medium pt-2 hover:underline">View all articles &rarr;</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
