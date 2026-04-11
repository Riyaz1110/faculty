import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import JobCard from '../components/JobCard'

const routeToCategoryMap = {
  engineering: 'Engineering',
  polytechnic: 'Polytechnic',
  'arts-and-science': 'Arts & Science',
  nursing: 'Nursing',
  'research-jobs': 'Research Jobs',
  'school-jobs': 'School Jobs',
}

const categoryIcons = {
  Engineering: '⚙️',
  Polytechnic: '🔧',
  'Arts & Science': '🎨',
  Nursing: '🏥',
  'Research Jobs': '🔬',
  'School Jobs': '📚',
}

const categoryDescriptions = {
  Engineering: 'Faculty positions for B.E / B.Tech engineering institutions',
  Polytechnic: 'Teaching roles in diploma and polytechnic colleges',
  'Arts & Science': 'Opportunities in liberal arts and science colleges',
  Nursing: 'Nursing faculty and medical college positions',
  'Research Jobs': 'Research associate and scientist positions in R&D institutions',
  'School Jobs': 'Teaching and administrative roles in schools',
}

export default function CategoryPage() {
  const location = useLocation()
  const categorySlug = location.pathname.replace('/', '')
  const category = routeToCategoryMap[categorySlug]

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (category) fetchJobs()
  }, [category])

  const fetchJobs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'approved')
      .eq('category', category)
      .order('created_at', { ascending: false })
    if (!error) setJobs(data || [])
    setLoading(false)
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-500">Category not found.</p>
        </div>
      </div>
    )
  }

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase()
    return (
      !q ||
      job.job_title.toLowerCase().includes(q) ||
      job.institute_name.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl">{categoryIcons[category]}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{category} Jobs</h1>
              <p className="text-sm text-gray-500 mt-0.5">{categoryDescriptions[category]}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, institute, or location..."
              className="input-field pl-9"
            />
          </div>
          <div className="text-sm text-gray-500 flex-shrink-0">
            {loading ? 'Loading...' : `${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} found`}
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="animate-spin w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">{categoryIcons[category]}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs listed yet</h3>
            <p className="text-sm text-gray-500">Check back soon — new positions are added regularly.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
