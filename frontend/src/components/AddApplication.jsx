import React, { useEffect, useState } from 'react'
import {
  createApplication,
  updateApplication,
  getResumes
} from '../api/services'

const AddApplication = ({ setApplications, onClose, editingApplication }) => {

  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(false)

  const [applicationData, setApplicationData] = useState({
    companyName: '',
    role: '',
    platform: 'LinkedIn',
    jobLink: '',
    resume: '',
    status: 'Applied',
    applicationDate: '',
    notes: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setApplicationData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      if (editingApplication) {
        const res = await updateApplication(editingApplication._id, applicationData)

        setApplications(prev =>
          prev.map(app =>
            app._id === editingApplication._id ? res.data : app
          )
        )

      } else {
        const res = await createApplication(applicationData)

        setApplications(prev => [res.data, ...prev])
      }

      onClose()

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await getResumes()
        setResumes(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchResumes()
  }, [])

  useEffect(() => {
    if (editingApplication) {
      setApplicationData({
        ...editingApplication,
        resume: editingApplication.resume?._id || ''
      })
    }
  }, [editingApplication])

  return (
    <div className="w-full">

      <div className='p-5 border-b border-gray-100'>
        <h2 className='text-lg font-semibold text-gray-800'>
          {editingApplication ? "Edit Application" : "Add Application"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-6 p-6'>

        <input
          name='companyName'
          value={applicationData.companyName}
          onChange={handleChange}
          placeholder='Company'
          className='input'
        />

        <input
          name='role'
          value={applicationData.role}
          onChange={handleChange}
          placeholder='Role'
          className='input'
        />

        <select
          name='platform'
          value={applicationData.platform}
          onChange={handleChange}
          className='input'
        >
          <option>LinkedIn</option>
          <option>Indeed</option>
          <option>Glassdoor</option>
          <option>AngelList</option>
        </select>

        <select
          name='status'
          value={applicationData.status}
          onChange={handleChange}
          className='input'
        >
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offered</option>
          <option>Rejected</option>
        </select>

        <select
          name='resume'
          value={applicationData.resume}
          onChange={handleChange}
          className='input'
        >
          <option value="">Select Resume</option>
          {resumes.map(res => (
            <option key={res._id} value={res._id}>
              {res.title}
            </option>
          ))}
        </select>

        <input
          type='date'
          name='applicationDate'
          value={applicationData.applicationDate?.slice(0, 10)}
          onChange={handleChange}
          className='input'
        />

        <input
          name='jobLink'
          value={applicationData.jobLink}
          onChange={handleChange}
          placeholder='Job Link'
          className='col-span-2 input'
        />

        <textarea
          name='notes'
          value={applicationData.notes}
          onChange={handleChange}
          placeholder='Notes'
          className='col-span-2 input'
        />

        <div className='col-span-2 flex justify-end gap-3 pt-4'>

          <button
            type='button'
            onClick={onClose}
            className='bg-white text-black text-center px-4 py-2 rounded-lg  border-2 border-black shadow-[4px_4px_0_0_#000] hover:opacity-90 transition'
          >
            Cancel
          </button>

          <button
            type='submit'
            disabled={loading}
            className='bg-indigo-500 text-white text-center px-4 py-2 rounded-lg  border-2 border-black shadow-[4px_4px_0_0_#000] hover:opacity-90 transition'
          >
            {loading ? "Saving..." : "Save Application"}
          </button>



        </div>

      </form>
    </div>
  )
}

export default AddApplication