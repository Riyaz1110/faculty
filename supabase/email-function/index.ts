// Supabase Edge Function — send email notifications via Resend
// Deploy: supabase functions deploy send-job-notification

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'admin@yourdomain.com'

interface EmailPayload {
  type: 'new_submission' | 'approved'
  to: string
  jobTitle: string
  instituteName: string
  category: string
  location: string
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'FacultyPlus <noreply@yourdomain.com>',
      to: [to],
      subject,
      html,
    }),
  })
  return res.ok
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const payload: EmailPayload = await req.json()

  if (payload.type === 'new_submission') {
    // Notify admin of new submission
    await sendEmail(
      ADMIN_EMAIL,
      `New Job Submission: ${payload.jobTitle}`,
      `
        <h2>New Job Posting Requires Approval</h2>
        <table>
          <tr><td><strong>Institute:</strong></td><td>${payload.instituteName}</td></tr>
          <tr><td><strong>Job Title:</strong></td><td>${payload.jobTitle}</td></tr>
          <tr><td><strong>Category:</strong></td><td>${payload.category}</td></tr>
          <tr><td><strong>Location:</strong></td><td>${payload.location}</td></tr>
          <tr><td><strong>Recruiter Email:</strong></td><td>${payload.to}</td></tr>
        </table>
        <p>Login to the admin dashboard to approve or reject.</p>
      `
    )
  } else if (payload.type === 'approved') {
    // Notify recruiter of approval
    await sendEmail(
      payload.to,
      `Your Job Posting has been Approved — ${payload.jobTitle}`,
      `
        <h2>Congratulations! Your Job Posting is Live</h2>
        <p>Your posting for <strong>${payload.jobTitle}</strong> at <strong>${payload.instituteName}</strong> has been approved and is now publicly visible on FacultyPlus.</p>
        <p>Visit <a href="https://facultyplus.vercel.app">FacultyPlus</a> to view your listing.</p>
      `
    )
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
