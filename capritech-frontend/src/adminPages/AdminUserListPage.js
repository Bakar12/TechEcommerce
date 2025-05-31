import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (!storedUserInfo) {
          setError('No user is logged in.');
          return;
        }

        const token = JSON.parse(storedUserInfo).token;

        const { data } = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')).token;
        await axios.delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        alert('Error deleting user');
      }
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ _id, name, email, isAdmin }) => (
              <tr key={_id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  {!isAdmin && (
                    <>
                      <Link to={`/admin/user/${_id}/appointments`}>
                        <button>View Appointments</button>
                      </Link>
                      &nbsp;
                      <button onClick={() => deleteUser(_id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserListPage;

