import { useNavigate } from "react-router-dom";

const categoryColors = {
  Engineering: 'bg-blue-100 text-blue-700',
  Polytechnic: 'bg-purple-100 text-purple-700',
  'Arts & Science': 'bg-green-100 text-green-700',
  Nursing: 'bg-pink-100 text-pink-700',
  'Research Jobs': 'bg-orange-100 text-orange-700',
  'School Jobs': 'bg-teal-100 text-teal-700',
}

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const colorClass = categoryColors[job.category] || 'bg-gray-100 text-gray-700'

  const postedDate = new Date(job.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div
      onClick={() => navigate(`/job/${job.id}`)}
      className="cursor-pointer bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{job.job_title}</h3>
          <p className="text-sm text-gray-600 truncate">{job.institute_name}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${colorClass}`}>
          {job.category}
        </span>
      </div>

      <div className="text-xs text-gray-500 flex gap-4">
        <span>{job.location}</span>
        <span>{postedDate}</span>
      </div>

      {/* ✅ FIXED PREVIEW */}
      {job.description && (
        <p className="text-sm text-gray-600 line-clamp-2 whitespace-pre-line">
          {job.description}
        </p>
      )}

      <div className="flex justify-between text-xs text-gray-400">
        <span>{job.email}</span>
        <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">
          Hiring
        </span>
      </div>
    </div>
  )
}