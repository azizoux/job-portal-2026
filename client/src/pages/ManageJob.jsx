import React, { useContext, useEffect, useState } from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ManageJob = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const { backendUrl, companyToken } = useContext(AppContext);

  // Function to fetch company Job Application
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  //  Function to change Job Visibility
  const changeJobVisiblity = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } },
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchCompanyJobs();
  }, []);

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm ">
          <thead>
            <th className="py-2 px-4 border-b border-gray-200 text-left max-sm:hidden">
              #
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">
              Job Title
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left max-sm:hidden">
              Date
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left max-sm:hidden">
              Location
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-center">
              Applicans
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left">
              Visible
            </th>
          </thead>
          <tbody>
            {jobs?.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="px-4 py-2 border-b border-gray-200 max-sm:hidden">
                  {index + 1}
                </td>
                <td px-4 py-2 border-b border-gray-200>
                  {job.title}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 max-sm:hidden">
                  {moment(job.date).format("D MMM, YYYY")}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 max-sm:hidden">
                  {job.location}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">
                  {job.applicants}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={job.visible}
                    className="scale-125 ml-4"
                    onChange={() => changeJobVisiblity(job._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white px-4 py-2 rounded "
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJob;
