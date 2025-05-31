import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const AdminUserAppointmentsPage = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndAppointments = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')).token;
        // Fetch user details
        const userRes = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundUser = userRes.data.find(u => u._id === id);
        setUser(foundUser);

        // Fetch appointments for this user
        const apptRes = await axios.get(`http://localhost:5000/api/appointments?email=${foundUser.email}`);
        setAppointments(apptRes.data);
      } catch (err) {
        setUser(null);
        setAppointments([]);
      }
    };
    fetchUserAndAppointments();
  }, [id]);

  if (!user) return <div>User not found.</div>;

  return (
    <div>
      <h2>Appointments for {user.name}</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <Link to="/admin/users">&larr; Back to Users</Link>
      <ul style={{ marginTop: 20 }}>
        {appointments.length === 0 && <li>No appointments found.</li>}
        {appointments.map(a => (
          <li key={a._id} style={{ marginBottom: 16, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
            <b>Service:</b> {a.service}<br />
            <b>Date:</b> {a.date} <b>Time:</b> {a.time}<br />
            {a.notes && <><b>Notes:</b> {a.notes}<br /></>}
            <b>Booked:</b> {new Date(a.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserAppointmentsPage;