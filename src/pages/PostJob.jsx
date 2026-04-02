import { useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const categories = ['Engineering', 'Polytechnic', 'Arts & Science', 'Nursing', 'Research Jobs', 'School Jobs']

const initialForm = {
  institute_name: '',
  job_title: '',
  category: '',
  location: '',
  description: '',
  email: '',
}

export default function PostJob() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const { error } = await supabase.from('jobs').insert([{ ...form, status: 'pending' }])
      if (error) throw error
      setSubmitted(true)
      setForm(initialForm)
      toast.success('Job posted! Awaiting admin approval.')
    } catch (err) {
      toast.error(err.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Submission Received!</h2>
          <p className="text-gray-500 text-sm mb-6">Your job posting has been submitted and is pending admin approval. You'll receive an email once it's approved.</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary text-sm w-full">
            Post Another Job
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Post a Recruitment</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below. Your listing will be reviewed and published within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Institute Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="institute_name"
                value={form.institute_name}
                onChange={handleChange}
                required
                placeholder="e.g. ABC Engineering College"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="job_title"
                value={form.job_title}
                onChange={handleChange}
                required
                placeholder="e.g. Assistant Professor - CSE"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="e.g. Chennai, Tamil Nadu"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="hr@institution.edu.in"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Describe qualifications, responsibilities, pay scale, and any other relevant details..."
              className="input-field resize-none"
            />
          </div>

          <div className="pt-2">
            <button type="submit" disabled={submitting} className="btn-primary w-full text-sm">
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : 'Submit Recruitment'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">Your posting will be reviewed by our team before publishing.</p>
          </div>
        </form>
      </div>
    </div>
  )
}
