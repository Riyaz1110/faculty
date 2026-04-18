import React from 'react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>

        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p>
            CampusHire was launched to serve as the premier career site dedicated to higher education and faculty jobs. The site is free for job seekers, while employers pay a small fee to advertise job opportunities.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Our Mission</h2>
          <p>
            Our goal at CampusHire is to provide a valuable resource for professors, lecturers, researchers, and those looking to enter this specialized field of teaching and academia.
          </p>

          {/* <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Giving Back</h2>
          <p>
            CampusHire is committed to giving back. We have donated thousands of dollars to organizations and schools that support education. We have also helped individual teachers fund educational purchases for their classrooms. Here are some of the groups and individuals we have donated to:
          </p>

          <ul className="list-disc pl-5 space-y-4 marker:text-violet-500">
            <li>
              <strong>Science Club for Girls</strong><br />
              Cambridge, Massachusetts
            </li>
            <li>
              <strong>STEM Education Coalition</strong><br />
              Washington, D.C.
            </li>
            <li>
              <strong>Holbrook Middle School</strong><br />
              Holbrook, Arizona<br />
              <em>Supplies for Mrs. Baloo's class via donorschoose.org</em>
            </li>
            <li>
              <strong>Denver School of Science and Technology</strong><br />
              <a href="http://dsstpublicschools.org" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">dsstpublicschools.org</a><br />
              Denver, Colorado
            </li>
            <li>
              <strong>Silicon Valley Education Foundation</strong><br />
              <a href="http://svefoundation.org" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">svefoundation.org</a><br />
              San Jose, California
            </li>
            <li>
              <strong>Educate78.org</strong><br />
              Oakland, California
            </li>
          </ul> */}

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="mb-6">
              We are always looking for ways to improve CampusHire. Please send your feedback to:{' '}
              <a href="mailto:info@campushire.com" className="text-violet-600 font-medium hover:underline">
                info@campushire.com
              </a>. Thanks for stopping by.
            </p>

            <p>
              Best regards,<br />
              <strong>Founder</strong><br />
              CampusHire
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
