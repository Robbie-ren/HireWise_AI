import { useEffect, useState } from 'react'
import axios from 'axios'
import { supabase } from '../lib/supabase'

export default function Candidate() {
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState('')
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState({})

  useEffect(() => {
    const fetchRoles = async () => {
      const { data } = await supabase.from('job_roles').select()
      setRoles(data)
    }
    fetchRoles()
  }, [])

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', file)

    // Parse resume
    const res = await axios.post('http://localhost:8000/parse-resume/', formData)
    setInfo(res.data)

    const filePath = `${selectedRole}/${file.name}`
    await supabase.storage.from('resumes').upload(filePath, file)

    // Add to resumes table
    const job = roles.find(r => r.role === selectedRole)
    await supabase.from('resumes').insert([
      {
        candidate_name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        role_id: job.id,
        resume_url: filePath,
      }
    ])
    alert('Resume Uploaded!')
  }

  return (
    <div>
      <h1>Candidate Upload</h1>
      <select onChange={e => setSelectedRole(e.target.value)}>
        <option>Select Job Role</option>
        {roles.map(role => (
          <option key={role.id}>{role.role}</option>
        ))}
      </select>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Resume</button>

      {info.name && (
        <div>
          <p>Name: {info.name}</p>
          <p>Email: {info.email}</p>
          <p>Phone: {info.phone}</p>
        </div>
      )}
    </div>
  )
}
