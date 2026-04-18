import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function PostResume() {
  const { user, isEmployer, authLoading, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    qualification: '',
    resumeFile: null
  })

  useEffect(() => {
    if (user && user.email && !form.email) {
      setForm(prev => ({ ...prev, email: user.email, full_name: user.user_metadata?.full_name || '' }))
    }
  }, [user, form.email])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'resumeFile') {
      setForm(prev => ({ ...prev, resumeFile: files[0] }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!form.resumeFile) {
      toast.error('Please upload your resume PDF.')
      return
    }

    if (form.resumeFile.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed.')
      return
    }

    setLoading(true)

    try {
      // 1. Upload PDF to Storage
      const fileExt = form.resumeFile.name.split('.').pop()
      const fileName = `${user.id}_${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, form.resumeFile)

      if (uploadError) throw uploadError

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath)

      // 3. Insert Database Record
      const { error: insertError } = await supabase.from('resumes').insert([{
        user_id: user.id,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        qualification: form.qualification,
        resume_url: publicUrl
      }])

      if (insertError) throw insertError

      toast.success('Your resume has been successfully submitted!')
      navigate('/')
      
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'An error occurred while uploading. Ensure database tables are created.')
    } finally {
      setLoading(false)
    }
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

  // Employers shouldn't post resumes, require standard user login
  if (isEmployer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Employers Cannot Post Resumes</h2>
          <p className="text-gray-500 text-sm mb-8">You are logged in as an Employer. Only Job Seekers can post resumes.</p>
          <button onClick={() => navigate('/')} className="btn-primary text-sm w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded transition">
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in Required</h2>
          <p className="text-gray-500 text-sm mb-8">You must be signed in as a Job Seeker to submit your resume.</p>
          <button onClick={signInWithGoogle} className="btn-primary text-sm w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded transition flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"/></svg>
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Post Your Resume</h1>
          <p className="text-gray-500 text-sm mt-1">Submit your profile to allow employers and institutions to discover you.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+91 9876543210"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Highest Qualification <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                required
                placeholder="e.g. Ph.D. in Computer Science"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address / Location</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="e.g. Chennai, Tamil Nadu"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          <div className="pt-2 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-1.5 mt-4">Upload Resume (PDF only) <span className="text-red-500">*</span></label>
            <input
              type="file"
              name="resumeFile"
              accept=".pdf"
              onChange={handleChange}
              required
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
            <p className="text-xs text-gray-400 mt-2">Maximum file size: 5MB</p>
          </div>
          
          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded shadow transition">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Uploading...
                </span>
              ) : 'Submit Resume'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
