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

        {/* Job Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {job.job_title}
        </h1>

        {/* Institute & Location */}
        <p className="text-gray-600">{job.institute_name}</p>
        <p className="text-sm text-gray-500 mb-4">{job.location}</p>
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
        <div className="whitespace-pre-line text-gray-700 leading-relaxed mb-6">
          {job.description}
        </div>

        {/* Additional Info */}
        <div className="border-t pt-4 text-sm text-gray-600 space-y-1">
          <p><strong>Email:</strong> {job.email}</p>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Status:</strong> {job.status}</p>
        </div>

      </div>
    </div>
  );
}