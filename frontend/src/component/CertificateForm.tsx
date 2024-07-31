import React, { useState } from 'react';

const CertificateForm: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [dateOfCompletion, setDateOfCompletion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/certificates/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentName, courseName, dateOfCompletion }),
    });

    if (!response.ok) {
      console.error('Error generating certificate');
      return;
    }

    // Create a blob from the response and trigger download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentName}_${courseName}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div>
          <label>Date of Completion:</label>
          <input
            type="date"
            value={dateOfCompletion}
            onChange={(e) => setDateOfCompletion(e.target.value)}
          />
        </div>
        <button type="submit">Generate Certificate</button>
      </form>
    </div>
  );
};

export default CertificateForm;
