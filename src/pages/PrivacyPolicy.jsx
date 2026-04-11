import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p>
            CampusHire is committed to user privacy. Below is information about our commitment to you.
          </p>

          <p>
            You can browse and apply for jobs listed at CampusHire anonymously. You can apply for most jobs with just your email address, so you don't have to give out your name, phone number, or other personal information. If your goal is to remain completely anonymous, we recommend that you use an email address that does not reveal your name or place of work. To set-up a free email account, go to: <a href="http://www.yahoo.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">www.yahoo.com</a>
          </p>
          
          <ul className="list-disc pl-5 space-y-2 marker:text-violet-500">
            <li>We do not read your private online communications.</li>
            <li>We do not sell, distribute or make available any personal information about you to third parties so they can target you with advertising or marketing campaigns.</li>
            <li>We do not share information entered into our database with other Internet job sites. This includes resumes, cover letters, references, and other material. If you decide to post a resume in our database, you will be able to delete it at any time. We also do not keep any information from your deleted resume on our servers.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Use of Cookies</h2>
          <p>
            CampusHire uses "cookies" to help personalize your online experience. A cookie is a text file that is placed on your hard disk by a Web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you. One of the primary purposes of cookies is to provide a convenience feature to save you time.
          </p>
          
          <p>
            The purpose of a cookie is to tell the Web server that you have returned to a specific page. For example, if you register with CampusHire, a cookie helps us to recall your specific account information on subsequent visits. This simplifies the process of recording your personal information, such as resume information, and so on. When you return to the same CampusHire page, the information you previously provided can be retrieved, so you can easily use the CampusHire features that you customized.
          </p>

          <p>
            You have the ability to accept or decline cookies. Most Web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may experience problems accessing your personal account on CampusHire. Your ability to search our job listings does not require that you accept any cookies from CampusHire.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p>
              If you have a question or concern about our privacy commitment, please send an email to:{' '}
              <a href="mailto:info@campushire.com" className="text-violet-600 font-medium hover:underline">
                info@campushire.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
