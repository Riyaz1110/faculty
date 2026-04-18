import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const categories = ['Engineering', 'Polytechnic', 'Arts & Science', 'Nursing', 'Research Jobs', 'School Jobs']

const engineeringSubCategories = [
  "Architecture Faculty Job", "Aeronautical Faculty Jobs", "Automobile Faculty Job",
  "Agricultural Engineering", "BME Faculty Job", "Civil Faculty Job",
  "Chemical Engg Faculty Job", "CSE Faculty Job", "EEE Faculty Job",
  "ECE Faculty Job", "EIE Faculty Job", "Mechanical Faculty Job",
  "MBA Faculty Jobs", "MCA Faculty Job", "Science and Humanities",
  "View All Departments"
]

const jobTypes = [
  "Full-time",
  "Part-time",
  "Substitute",
  "Temporary / Contract"
]

const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
]

const initialForm = {
  institute_name: '',
  job_title: '',
  job_type: '',
  category: '',
  sub_category: '',
  state: '',
  location: '',
  description: '',
  email: '',
  contact_no: '',
  advertisement_image: '',
  company_logo: '',
  post_date: '',
  deadline: ''
}

export default function PostJob() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { user, isEmployer, authLoading } = useAuth()

  useEffect(() => {
    if (user && user.email && !form.email) {
      setForm(prev => ({ ...prev, email: user.email }))
    }
  }, [user, form.email])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Clear sub_category if not Engineering
    const submissionData = { ...form }
    if (submissionData.category !== 'Engineering') {
      submissionData.sub_category = ''
    }
    
    // Add user_id to identify who posted this requirement
    if (user) {
      submissionData.user_id = user.id
    }

    try {
      const { error } = await supabase.from('jobs').insert([{ ...submissionData, status: 'pending' }])
      if (error) throw error
      setSubmitted(true)
      setForm(initialForm)
      toast.success('Job posted! Awaiting admin approval.')
    } catch (err) {
      toast.error('Failed to submit. Please ensure your old database table was recreated.')
      console.error(err)
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
          <button onClick={() => setSubmitted(false)} className="btn-primary text-sm w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded transition">
            Post Another Job
          </button>
        </div>
      </div>
    )
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <svg className="animate-spin w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    )
  }

  if (!isEmployer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Employer Account Required</h2>
          <p className="text-gray-500 text-sm mb-8">You must be logged in as an Employer to post recruitment requirements.</p>
          <Link to="/employer-auth" state={{ from: { pathname: "/post-job" } }} className="btn-primary text-sm w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded transition flex items-center justify-center gap-2">
            Sign In / Register as Employer
          </Link>
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
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
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
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Type <span className="text-red-500">*</span></label>
              <select
                name="job_type"
                value={form.job_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              >
                <option value="">Select type</option>
                {jobTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            {form.category === 'Engineering' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sub Category <span className="text-red-500">*</span></label>
                <select
                  name="sub_category"
                  value={form.sub_category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
                >
                  <option value="">Select sub category</option>
                  {engineeringSubCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">State <span className="text-red-500">*</span></label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              >
                <option value="">Select a state</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City / Location <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="e.g. Chennai"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Post Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="post_date"
                value={form.post_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Deadline <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="hr@institution.edu.in"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Number</label>
              <input
                type="text"
                name="contact_no"
                value={form.contact_no}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Advertisement Image URL</label>
              <input
                type="url"
                name="advertisement_image"
                value={form.advertisement_image}
                onChange={handleChange}
                placeholder="https://imgur.com/example.png"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">Provide a link to the recruitment advertisement banner.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Logo URL</label>
              <input
                type="url"
                name="company_logo"
                value={form.company_logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">Provide a link to the institution logo.</p>
            </div>
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none resize-none"
            />
          </div>
          
          <div className="pt-2">
            <button type="submit" disabled={submitting} className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded shadow transition">
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
