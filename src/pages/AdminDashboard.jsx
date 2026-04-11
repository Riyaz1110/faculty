import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [actionLoading, setActionLoading] = useState(null)
  const [expandedRow, setExpandedRow] = useState(null);
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setJobs(data || [])
    else toast.error('Failed to load jobs')
    setLoading(false)
  }

  const updateStatus = async (id, status, email, jobTitle) => {
    setActionLoading(id + status)
    const { error } = await supabase.from('jobs').update({ status }).eq('id', id)
    if (error) {
      toast.error('Failed to update status')
    } else {
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)))
      toast.success(`Job ${status === 'approved' ? 'approved' : 'rejected'}!`)
    }
    setActionLoading(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const filtered = filter === 'all' ? jobs : jobs.filter((j) => j.status === filter)

  const counts = {
    all: jobs.length,
    pending: jobs.filter((j) => j.status === 'pending').length,
    approved: jobs.filter((j) => j.status === 'approved').length,
    rejected: jobs.filter((j) => j.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage all job submissions</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchJobs} className="btn-secondary text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { key: 'all', label: 'Total', color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200' },
            { key: 'pending', label: 'Pending', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
            { key: 'approved', label: 'Approved', color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
            { key: 'rejected', label: 'Rejected', color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
          ].map((s) => (
            <div key={s.key} className={`rounded-xl border ${s.bg} p-4 text-center cursor-pointer transition-all ${filter === s.key ? 'ring-2 ring-violet-500' : ''}`} onClick={() => setFilter(s.key)}>
              <div className={`text-2xl font-bold ${s.color}`}>{counts[s.key]}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${filter === f ? 'bg-violet-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="animate-spin w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500 text-sm">No jobs found for this filter.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Institute</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Job Title</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Category</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Email</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Date</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
  {filtered.map((job) => (
    <>
      <tr key={job.id} className="hover:bg-gray-50 transition-colors">
        <td className="px-5 py-4">
          <div className="font-medium text-gray-900 max-w-[160px] truncate">
            {job.institute_name}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            {job.location}
          </div>
        </td>

        <td className="px-5 py-4">
          <div className="text-gray-800 max-w-[180px] truncate">
            {job.job_title}
          </div>
        </td>

        <td className="px-5 py-4 hidden sm:table-cell">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {job.category}
          </span>
        </td>

        <td className="px-5 py-4 hidden md:table-cell text-gray-500 text-xs">
          {job.email}
        </td>

        <td className="px-5 py-4 hidden lg:table-cell text-gray-400 text-xs">
          {new Date(job.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </td>

        <td className="px-5 py-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[job.status]}`}>
            {job.status}
          </span>
        </td>

        {/* 🔽 NEW VIEW BUTTON */}
        <td className="px-5 py-4">
          <button
            onClick={() =>
              setExpandedRow(expandedRow === job.id ? null : job.id)
            }
            className="text-violet-600 text-xs font-medium"
          >
            {expandedRow === job.id ? "▲ Hide" : "▼ View"}
          </button>
        </td>

        {/* ACTION BUTTONS */}
        <td className="px-5 py-4">
          {job.status === 'pending' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateStatus(job.id, 'approved')}
                className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-md"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(job.id, 'rejected')}
                className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-md"
              >
                Reject
              </button>
            </div>
          )}

          {job.status === 'approved' && (
            <button
              onClick={() => updateStatus(job.id, 'rejected')}
              className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-md"
            >
              Reject
            </button>
          )}

          {job.status === 'rejected' && (
            <button
              onClick={() => updateStatus(job.id, 'approved')}
              className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-md"
            >
              Approve
            </button>
          )}
        </td>
      </tr>

      {/* 🔥 EXPANDED DESCRIPTION ROW */}
      {expandedRow === job.id && (
        <tr>
          <td colSpan="8" className="px-5 py-4 bg-gray-50 border-t border-gray-100 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                {job.job_type && <p className="mb-1"><span className="font-semibold text-gray-700">Job Type:</span> <span className="text-gray-600">{job.job_type}</span></p>}
                {job.sub_category && <p className="mb-1"><span className="font-semibold text-gray-700">Sub Category:</span> <span className="text-gray-600">{job.sub_category}</span></p>}
                {job.state && <p className="mb-1"><span className="font-semibold text-gray-700">State:</span> <span className="text-gray-600">{job.state}</span></p>}
                {job.location && <p className="mb-1"><span className="font-semibold text-gray-700">City:</span> <span className="text-gray-600">{job.location}</span></p>}
              </div>
              <div>
                {job.contact_no && <p className="mb-1"><span className="font-semibold text-gray-700">Contact No:</span> <span className="text-gray-600">{job.contact_no}</span></p>}
                {job.email && <p className="mb-1"><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-600">{job.email}</span></p>}
                {job.advertisement_image && (
                  <p className="mt-2">
                    <span className="font-semibold text-gray-700 block mb-1">Advertisement Banner:</span>
                    <a href={job.advertisement_image} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-800 hover:underline bg-violet-50 px-3 py-1.5 rounded-md transition border border-violet-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      View Image Attachment
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-700 text-sm block mb-2">Description:</span>
              <div className="whitespace-pre-line text-sm text-gray-600 max-h-64 overflow-y-auto bg-white p-4 rounded-lg border border-gray-200">
                {job.description}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  ))}
</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
