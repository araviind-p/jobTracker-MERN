import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteModal = ({ setIsModalOpen, onSave }) => {
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const navigate = useNavigate()

  const handleSaveNote = async () => {
    const noteData = {
      companyName,
      jobRole,
      url,
      notes,
      jobStatus,
    };
    try {
      const response = await axios.post('http://localhost:3001/api/v1/addJobs', noteData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      console.log(response.data);
      toast.success("New job added");
      // onSave(response.data.newJob);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/profile");
        window.location.reload(); // Refresh the page after navigating
      }, 500);
    } catch (error) {
      console.error('Failed to save note:', error);
      toast.error("Failed to add job");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        setAccessToken(accessToken)
      } catch (error) {
        console.log('Failed to fetch user data:', error);
        navigate('/profile');
      }
    };

    fetchUserData();
  }, [navigate, handleSaveNote]);



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Add Job
        </h2>

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="Job Role"
        />

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Job URL"
        />

        <textarea
          className="w-full p-3 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />

        <select
          className="w-full p-3 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={jobStatus}
          onChange={(e) => setJobStatus(e.target.value)}
        >
          <option value="" disabled>Select Job Status</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveNote}
            className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NoteModal;
