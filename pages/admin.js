import { useState } from 'react'
import axios from 'axios'
import { supabase } from '../lib/supabase'

export default function Admin() {
  const [file, setFile] = useState(null)
  const [role, setRole] = useState('')

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', file)

    // Call Python AI Parser
    const res = await axios.post('http://localhost:8000/parse-jd/', formData)
    const parsedRole = res.data.job_role
    setRole(parsedRole)

    // Upload to Supabase
    const filePath = `${parsedRole}/${file.name}`
    await supabase.storage.from('job-descriptions').upload(filePath, file)

    // Create matching resume folder
    await supabase.storage.from('resumes').upload(`${parsedRole}/.keep`, new Blob(['']))

    // Add job role to DB
    await supabase.from('job_roles').insert([{ role: parsedRole, jd_url: filePath }])
    alert('Uploaded & Job Role Created!')
  }

  return (
    <div>
      <h1>Admin - Upload JD</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload & Parse</button>
      <p>Detected Role: {role}</p>
    </div>
  )
}
