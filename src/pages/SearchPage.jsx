import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import JobCard from '../components/JobCard'

const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
]

export default function SearchPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const initialQ = searchParams.get('q') || ''
  const initialLoc = searchParams.get('loc') || ''
  const initialCat = searchParams.get('cat') || ''
  const initialSub = searchParams.get('sub') || ''

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  // Local state for search fields
  const [query, setQuery] = useState(initialQ)
  const [locationQuery, setLocationQuery] = useState(initialLoc)
  const [categoryQuery, setCategoryQuery] = useState(initialCat)
  const [subQuery, setSubQuery] = useState(initialSub)
  const [jobTypeQuery, setJobTypeQuery] = useState('')
  const [dateQuery, setDateQuery] = useState('')

  const categories = [
    'Engineering', 'Polytechnic', 'Arts & Science',
    'Nursing', 'Research Jobs', 'School Jobs'
  ]

  const jobTypes = [
    "Full-time", "Part-time", "Substitute", "Temporary / Contract"
  ]
  const dateOptions = [
    "Past 24 hours", "Past week", "Past month"
  ]

  useEffect(() => {
    // Read from URL on mount/change
    const q = searchParams.get('q') || ''
    const loc = searchParams.get('loc') || ''
    const cat = searchParams.get('cat') || ''
    const sub = searchParams.get('sub') || ''

    setQuery(q)
    setLocationQuery(loc)
    setCategoryQuery(cat)
    setSubQuery(sub)

    fetchJobs(q, loc, cat, sub, jobTypeQuery, dateQuery)
    // Only re-trigger on location search, but we use all states cleanly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const fetchJobs = async (q, loc, cat, sub, type, date) => {
    setLoading(true)
    let queryBuilder = supabase
      .from('jobs')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (cat) queryBuilder = queryBuilder.ilike('category', `%${cat}%`)
    if (sub) queryBuilder = queryBuilder.ilike('sub_category', `%${sub}%`)
    if (type) queryBuilder = queryBuilder.eq('job_type', type)
    if (date) {
      const now = new Date()
      if (date === 'Past 24 hours') now.setDate(now.getDate() - 1)
      if (date === 'Past week') now.setDate(now.getDate() - 7)
      if (date === 'Past month') now.setMonth(now.getMonth() - 1)
      queryBuilder = queryBuilder.gte('created_at', now.toISOString())
    }

    const { data, error } = await queryBuilder

    if (!error && data) {
      let filtered = data

      if (q) {
        const qLower = q.toLowerCase()
        filtered = filtered.filter(job =>
          job.job_title?.toLowerCase().includes(qLower) ||
          job.institute_name?.toLowerCase().includes(qLower)
        )
      }
      if (loc) {
        const locLower = loc.toLowerCase()
        filtered = filtered.filter(job =>
          job.location?.toLowerCase().includes(locLower) ||
          job.state?.toLowerCase().includes(locLower)
        )
      }
      setJobs(filtered)
    } else {
      setJobs([])
    }
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    let currentSub = subQuery
    if (categoryQuery !== 'Engineering') {
      currentSub = ''
      setSubQuery('')
    }
    fetchJobs(query, locationQuery, categoryQuery, currentSub, jobTypeQuery, dateQuery)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Search Header Form UI mimicking the screenshot precisely */}
      <div className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-[0_4px_12px_rgb(0,0,0,0.06)] border border-gray-200 p-6 flex flex-col gap-4">

            {/* Top Row: Keyword and Search Button */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter job title or company name"
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#8bc34a] focus:border-[#8bc34a] outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-[#8bc34a] hover:bg-[#7cb342] text-white font-semibold py-2.5 px-8 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 md:w-auto w-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                Search
              </button>
            </div>

            {/* Bottom Row: 4 Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-violet-500 appearance-none outline-none"
                  value={categoryQuery}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                >
                  <option value="">Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>

              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-violet-500 appearance-none outline-none"
                  value={jobTypeQuery}
                  onChange={(e) => setJobTypeQuery(e.target.value)}
                >
                  <option value="">Job Type</option>
                  {jobTypes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>

              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-violet-500 appearance-none outline-none"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                >
                  <option value="">Location</option>
                  {indianStates.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>

              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-violet-500 appearance-none outline-none"
                  value={dateQuery}
                  onChange={(e) => setDateQuery(e.target.value)}
                >
                  <option value="">Date Posted</option>
                  {dateOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex-grow w-full">
        <div className="mb-6 flex justify-between items-center text-sm text-gray-500">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors inline-block pb-1">
            {loading ? (
              'Searching...'
            ) : (
              <>
                Found {jobs.length} Job{jobs.length !== 1 ? 's' : ''}
                {(subQuery || categoryQuery || jobTypeQuery || locationQuery || dateQuery) && (
                  <span className="text-violet-600 ml-1">
                    for the selected filters
                  </span>
                )}
              </>
            )}
          </h2>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="animate-spin w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="text-5xl mb-4 text-gray-300">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs matched your search</h3>
            <p className="text-sm text-gray-500">Try adjusting your filters, location, or keywords to find more opportunities.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
