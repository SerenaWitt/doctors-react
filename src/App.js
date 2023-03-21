import React, { useState, useEffect } from 'react';

function App() {
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientVisits, setPatientVisits] = useState([]);

  const handleSubmit = () => {
    fetch(`http://localhost:8080/api/v1/patients/${patientName}`)
      .then(response => response.json())
      .then(data => {
        setPatientId(data.id);

        fetch(`http://localhost:8080/api/v1/visits?patientid=${data.id}`)
          .then(response => response.json())
          .then(data => {
            setPatientVisits(data);
          });
      });
  };

  useEffect(() => {
    setPatientId('');
    setPatientVisits([]);
  }, [patientName]);

  return (
    <div class="login-box">
    <div>
      <h1>Patient Information</h1>
      <input type="text" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Patient Name" />
      <div className='btn'>
        <button onClick={handleSubmit}>Find Patient</button>
      </div>
      </div>
      {patientId && (
        <div className='patient-information'>
          <div>
            <h3>Patient ID</h3>
            <p>{patientId}</p> 
          </div>
          <h3>Patient visits</h3>
          <ul>
            {patientVisits.map(visit => (
              <li key={visit.visitDate}>
                {visit.visitDate} - {visit.doctorName} ({visit.doctorSpecialty})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
