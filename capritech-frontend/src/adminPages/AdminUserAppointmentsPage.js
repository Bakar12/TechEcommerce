import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data } = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>All Appointments</h1>
      <ul>
        {appointments.map(a => (
          <li key={a._id} style={{ marginBottom: 20 }}>
            <b>{a.name}</b> ({a.email}, {a.phone})<br />
            Service: {a.service}<br />
            Date: {a.date} Time: {a.time}<br />
            Notes: {a.notes}<br />
            {a.image && (
              <img src={`http://localhost:5000${a.image}`} alt="Problem" style={{ maxWidth: 200, marginTop: 8 }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAppointmentsPage;