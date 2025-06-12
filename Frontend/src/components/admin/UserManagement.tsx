import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'warden' | 'student';
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' as const });
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users
  const fetchUsers = async () => {
    // In a real app, you would fetch from your backend
    // For now, we'll use dummy data
    const dummyUsers: User[] = [
      { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', createdAt: '2025-01-15' },
      { id: '2', name: 'Warden Singh', email: 'warden@example.com', role: 'warden', createdAt: '2025-02-10' },
      { id: '3', name: 'Student Kumar', email: 'student@example.com', role: 'student', createdAt: '2025-03-05' },
      { id: '4', name: 'Hostel Manager', email: 'manager@example.com', role: 'warden', createdAt: '2025-01-20' },
    ];
    setUsers(dummyUsers);
    setFilteredUsers(dummyUsers);
  };

  // Handle user form input changes
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Add a new user
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    const newUserObj: User = {
      id: (users.length + 1).toString(),
      ...newUser,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, newUserObj]);
    setFilteredUsers(prev => [...prev, newUserObj]);
    setNewUser({ name: '', email: '', role: 'student' });
    setIsAddingUser(false);
    alert('User added successfully!');
  };

  // Delete a user
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app, you would send this to your backend
      setUsers(prev => prev.filter(user => user.id !== userId));
      setFilteredUsers(prev => prev.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  // Search users
  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setUserSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) || 
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      
      <div className="user-controls">
        <div className="user-search">
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={userSearchQuery}
            onChange={handleUserSearch}
            className="search-input"
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginRight: '10px',
              minWidth: '250px'
            }}
          />
        </div>
        
        <button 
          className="add-user-btn"
          onClick={() => setIsAddingUser(true)}
          style={{
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          + Add New User
        </button>
      </div>
      
      {isAddingUser && (
        <div className="add-user-form" style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Add New User</h3>
          <form onSubmit={handleAddUser}>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleUserInputChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleUserInputChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>Role</label>
              <select
                id="role"
                name="role"
                value={newUser.role}
                onChange={handleUserInputChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="admin">Admin</option>
                <option value="warden">Warden</option>
                <option value="student">Student</option>
              </select>
            </div>
            
            <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsAddingUser(false)}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="users-table-container" style={{ marginTop: '20px' }}>
        <table className="users-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Created At</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>{user.name}</td>
                <td style={{ padding: '12px' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: 
                      user.role === 'admin' ? '#dc3545' :
                      user.role === 'warden' ? '#007bff' : '#28a745',
                    color: 'white'
                  }}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{user.createdAt}</td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '15px', textAlign: 'center' }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
