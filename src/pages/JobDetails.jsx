import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) setJob(data);
  };

  if (!job) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* Job Title & Logo */}
        <div className="flex items-start gap-5 mb-4">
          {job.company_logo && (
            <div className="w-16 h-16 flex-shrink-0 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-1 shadow-sm">
              <img src={job.company_logo} alt="Institution Logo" className="max-w-full max-h-full object-contain" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {job.job_title}
            </h1>
            <p className="text-gray-600">{job.institute_name}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
        </div>
        <div className="flex gap-6 text-sm text-gray-600 mb-4">
  <p>
    <strong>Post Date:</strong>{" "}
    {job.post_date
      ? new Date(job.post_date).toLocaleDateString('en-IN')
      : "N/A"}
  </p>
        
  <p className="text-red-600 font-semibold">
    <strong>Last Date:</strong>{" "}
    {job.deadline
      ? new Date(job.deadline).toLocaleDateString('en-IN')
      : "N/A"}
  </p>
</div>

        {/* 🔥 DESCRIPTION (FIXED HERE) */}
        <div className="whitespace-pre-line text-gray-700 leading-relaxed mb-8">
          {job.description}
        </div>

        {/* Advertisement Image */}
        {job.advertisement_image && (
          <div className="mb-8 border rounded-lg overflow-hidden relative group">
            <h3 className="bg-gray-100 text-gray-800 text-sm font-bold px-4 py-2 border-b">Advertisement Banner</h3>
            <div className="bg-gray-50 flex justify-center p-4">
              <img src={job.advertisement_image} alt="Advertisement" className="max-h-96 object-contain" />
            </div>
            {/* View Full Screen Link Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
               <a href={job.advertisement_image} target="_blank" rel="noreferrer" className="bg-white px-4 py-2 rounded-md font-medium text-gray-800 shadow-lg hover:bg-gray-50">View Full Size</a>
            </div>
          </div>
        )}

        {/* Additional Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6 text-sm text-gray-600">
          <div className="space-y-2">
            <p><strong>Category:</strong> {job.category}</p>
            {job.job_type && <p><strong>Job Type:</strong> {job.job_type}</p>}
            {job.sub_category && <p><strong>Sub Category:</strong> {job.sub_category}</p>}
            {job.state && <p><strong>State:</strong> {job.state}</p>}
            <p><strong>Status:</strong> <span className="capitalize">{job.status}</span></p>
          </div>
          <div className="space-y-2 md:text-right">
            <p><strong>Contact Email:</strong> <a href={`mailto:${job.email}`} className="text-violet-600 hover:text-violet-800">{job.email}</a></p>
            {job.contact_no && <p><strong>Contact Form:</strong> <a href={`tel:${job.contact_no}`} className="text-violet-600 hover:text-violet-800">{job.contact_no}</a></p>}
          </div>
        </div>

      </div>
    </div>
  );
}