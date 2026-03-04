import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageJob = () => {
  const navigate = useNavigate();

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
            {manageJobsData.map((job, index) => (
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
                  <input type="checkbox" className="scale-125 ml-4" />
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
