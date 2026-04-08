import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const postedDate = new Date(job.created_at);
  const isNew = (new Date() - postedDate) < (7 * 24 * 60 * 60 * 1000); // within 7 days
  
  const formattedDate = postedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
  });

  return (
    <div
      onClick={() => navigate(`/job/${job.id}`)}
      className="cursor-pointer bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition p-5 w-full flex flex-col group relative"
    >
      <div className="flex justify-between items-start gap-4">
        
        {/* Left Content Area */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-blue-600 group-hover:underline line-clamp-2 leading-tight">
            {job.job_title}
          </h3>
          <h4 className="font-bold text-[15px] text-gray-800 mt-1">
            {job.institute_name}
          </h4>
          
          {job.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-snug">
              {job.description}
            </p>
          )}

          {/* Meta Information Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>{job.location}{job.state && `, ${job.state}`}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>Posted {formattedDate}</span>
            </div>
            
            {isNew && (
              <span className="bg-[#8bc34a] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase leading-none flex items-center">
                New
              </span>
            )}
            
            <span className="bg-[#039be5] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase leading-none flex items-center">
              Featured
            </span>
          </div>
        </div>

        {/* Right Logo Area */}
        <div className="hidden sm:flex flex-col items-center justify-start flex-shrink-0 w-24">
          <div className="w-full aspect-square bg-white border border-gray-100 p-1 flex items-center justify-center text-gray-400 rounded-md">
             {job.company_logo ? (
               <img src={job.company_logo} alt="Company Logo" className="max-w-full max-h-full object-contain" />
             ) : job.advertisement_image ? (
               <img src={job.advertisement_image} alt="Logo" className="max-w-full max-h-full object-contain" />
             ) : (
                <div className="flex flex-col items-center w-full h-full justify-center">
                  <div className="text-2xl font-bold bg-orange-500 text-white w-full h-full flex items-center justify-center rounded-sm leading-none">
                    {job.institute_name ? job.institute_name.charAt(0).toUpperCase() : 'C'}
                  </div>
                </div>
             )}
          </div>
        </div>

      </div>

      {/* Very Bottom Category Tag */}
      <div className="flex mt-5 pt-3">
        <div className="border border-gray-300 text-gray-500 text-xs px-2 py-1 rounded inline-block bg-white shadow-sm">
          {job.sub_category ? `${job.category}: ${job.sub_category}` : job.category}
        </div>
      </div>

    </div>
  )
}