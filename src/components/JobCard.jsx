const categoryColors = {
  Engineering: 'bg-blue-100 text-blue-700',
  Polytechnic: 'bg-purple-100 text-purple-700',
  'Arts & Science': 'bg-green-100 text-green-700',
  Nursing: 'bg-pink-100 text-pink-700',
  'Research Jobs': 'bg-orange-100 text-orange-700',
  'School Jobs': 'bg-teal-100 text-teal-700',
}

export default function JobCard({ job }) {
  const colorClass = categoryColors[job.category] || 'bg-gray-100 text-gray-700'
  const postedDate = new Date(job.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base leading-snug truncate">{job.job_title}</h3>
          <p className="text-sm text-gray-600 mt-0.5 truncate">{job.institute_name}</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${colorClass}`}>
          {job.category}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {postedDate}
        </span>
      </div>

      {job.description && (
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{job.description}</p>
      )}

      <div className="pt-1 border-t border-gray-50 flex items-center justify-between">
        <span className="text-xs text-gray-400">{job.email}</span>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Hiring</span>
      </div>
    </div>
  )
}
