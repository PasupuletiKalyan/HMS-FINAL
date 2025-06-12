import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../../config/api';

interface Announcement {
  _id: string;
  text: string;
  type: 'urgent' | 'info' | 'maintenance' | 'event';
  icon: string;
  createdAt: string;
  active: boolean;
  expiresAt: string | null;
}

const AnnouncementsManagement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [isEditingAnnouncement, setIsEditingAnnouncement] = useState<string | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState<{
    text: string;
    type: 'urgent' | 'info' | 'maintenance' | 'event';
    icon: string;
    active: boolean;
    expiresAt: string | null;
  }>({
    text: '',
    type: 'info',
    icon: 'fa-info-circle',
    active: true,
    expiresAt: null
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Function to fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/announcements/admin/all'));
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnnouncements(data.announcements);
        } else {
          console.error('Failed to fetch announcements:', data.message);
        }
      } else {
        console.error('Failed to fetch announcements: Server returned status', response.status);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // On error, set some example data for UI testing
      setAnnouncements([
        {
          _id: '1',
          text: 'Urgent: Fee Payment due May 2nd! Pay now to secure your hostel seat.',
          type: 'urgent',
          icon: 'fa-exclamation-circle',
          createdAt: new Date().toISOString(),
          active: true,
          expiresAt: null
        },
        {
          _id: '2',
          text: 'Room Booking opens April 29th! Check availability in your preferred block.',
          type: 'info',
          icon: 'fa-door-open',
          createdAt: new Date().toISOString(),
          active: true,
          expiresAt: null
        }
      ]);
    }
  };

  // Add a new announcement
  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(buildApiUrl('/api/announcements'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnnouncement),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnnouncements(prev => [data.announcement, ...prev]);
          setIsAddingAnnouncement(false);
          setNewAnnouncement({
            text: '',
            type: 'info',
            icon: 'fa-info-circle',
            active: true,
            expiresAt: null
          });
          alert('Announcement added successfully!');
        } else {
          alert('Failed to add announcement: ' + data.message);
        }
      } else {
        alert('Failed to add announcement');
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
      alert('An error occurred while adding the announcement');
    }
  };

  // Update an announcement
  const handleUpdateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingAnnouncement) return;

    try {
      const response = await fetch(buildApiUrl(`/api/announcements/${isEditingAnnouncement}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnnouncement),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnnouncements(prev =>
            prev.map(announcement =>
              announcement._id === isEditingAnnouncement ? data.announcement : announcement
            )
          );
          setIsEditingAnnouncement(null);
          setNewAnnouncement({
            text: '',
            type: 'info',
            icon: 'fa-info-circle',
            active: true,
            expiresAt: null
          });
          alert('Announcement updated successfully!');
        } else {
          alert('Failed to update announcement: ' + data.message);
        }
      } else {
        alert('Failed to update announcement');
      }
    } catch (error) {
      console.error('Error updating announcement:', error);
      alert('An error occurred while updating the announcement');
    }
  };

  // Delete an announcement
  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const response = await fetch(buildApiUrl(`/api/announcements/${id}`), {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnnouncements(prev => prev.filter(announcement => announcement._id !== id));
          alert('Announcement deleted successfully!');
        } else {
          alert('Failed to delete announcement: ' + data.message);
        }
      } else {
        alert('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('An error occurred while deleting the announcement');
    }
  };

  // Handle editing an announcement
  const handleEditAnnouncement = (announcement: Announcement) => {
    setIsEditingAnnouncement(announcement._id);
    setNewAnnouncement({
      text: announcement.text,
      type: announcement.type,
      icon: announcement.icon,
      active: announcement.active,
      expiresAt: announcement.expiresAt
    });
  };

  // Handle announcement form input change
  const handleAnnouncementInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setNewAnnouncement(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (name === 'expiresAt') {
      setNewAnnouncement(prev => ({
        ...prev,
        [name]: value ? new Date(value).toISOString() : null
      }));
    } else {
      setNewAnnouncement(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Get appropriate icon based on announcement type
  const getDefaultIcon = (type: string): string => {
    switch (type) {
      case 'urgent':
        return 'fa-exclamation-circle';
      case 'maintenance':
        return 'fa-wrench';
      case 'event':
        return 'fa-calendar-alt';
      case 'info':
      default:
        return 'fa-info-circle';
    }
  };

  // Update icon when type changes
  useEffect(() => {
    if (newAnnouncement.type) {
      setNewAnnouncement(prev => ({
        ...prev,
        icon: getDefaultIcon(prev.type)
      }));
    }
  }, [newAnnouncement.type]);

  return (
    <div className="announcements-management">
      <h1>Announcements Management</h1>
      
      <p style={{ marginBottom: '20px' }}>
        Manage announcements that will be displayed on the student dashboard.
      </p>
      
      {/* Button to add new announcement */}
      {!isAddingAnnouncement && !isEditingAnnouncement && (
        <button
          onClick={() => setIsAddingAnnouncement(true)}
          style={{
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Add New Announcement
        </button>
      )}
      
      {/* Form to add/edit announcement */}
      {(isAddingAnnouncement || isEditingAnnouncement) && (
        <div className="announcement-form-container" style={{ marginBottom: '30px' }}>
          <h2>{isEditingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}</h2>
          <form onSubmit={isEditingAnnouncement ? handleUpdateAnnouncement : handleAddAnnouncement}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Announcement Text:
              </label>
              <textarea
                name="text"
                value={newAnnouncement.text}
                onChange={handleAnnouncementInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  minHeight: '80px'
                }}
                placeholder="Enter announcement text"
              ></textarea>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Type:
              </label>
              <select
                name="type"
                value={newAnnouncement.type}
                onChange={handleAnnouncementInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              >
                <option value="info">Information</option>
                <option value="urgent">Urgent</option>
                <option value="maintenance">Maintenance</option>
                <option value="event">Event</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Icon:
              </label>
              <select
                name="icon"
                value={newAnnouncement.icon}
                onChange={handleAnnouncementInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              >
                <option value="fa-info-circle">Info Circle (ℹ️)</option>
                <option value="fa-exclamation-circle">Exclamation Circle (⚠️)</option>
                <option value="fa-wrench">Wrench (🔧)</option>
                <option value="fa-calendar-alt">Calendar (📅)</option>
                <option value="fa-book">Book (📚)</option>
                <option value="fa-door-open">Door (🚪)</option>
                <option value="fa-graduation-cap">Graduation Cap (🎓)</option>
                <option value="fa-bed">Bed (🛏️)</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
                Active:
              </label>
              <input
                type="checkbox"
                name="active"
                checked={newAnnouncement.active}
                onChange={handleAnnouncementInputChange}
                style={{ width: '20px', height: '20px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Expires At (optional):
              </label>
              <input
                type="date"
                name="expiresAt"
                value={newAnnouncement.expiresAt ? new Date(newAnnouncement.expiresAt).toISOString().split('T')[0] : ''}
                onChange={handleAnnouncementInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
              <small style={{ display: 'block', color: '#666', marginTop: '5px' }}>
                Leave empty if the announcement doesn't expire
              </small>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {isEditingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingAnnouncement(false);
                  setIsEditingAnnouncement(null);
                  setNewAnnouncement({
                    text: '',
                    type: 'info',
                    icon: 'fa-info-circle',
                    active: true,
                    expiresAt: null
                  });
                }}
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Preview section */}
      {(isAddingAnnouncement || isEditingAnnouncement) && (
        <div className="announcement-preview" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '15px' }}>Preview</h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '8px',
            borderLeft: `4px solid ${
              newAnnouncement.type === 'urgent' ? '#e53e3e' :
              newAnnouncement.type === 'maintenance' ? '#d69e2e' :
              newAnnouncement.type === 'event' ? '#38a169' : '#3182ce'
            }`
          }}>
            <i className={`fas ${newAnnouncement.icon}`} style={{ marginRight: '15px', fontSize: '18px' }}></i>
            <span>{newAnnouncement.text || 'Announcement text will appear here'}</span>
          </div>
        </div>
      )}
      
      {/* List of announcements */}
      <div className="announcements-list">
        <h2 style={{ marginBottom: '15px' }}>Current Announcements</h2>
        
        {announcements.length === 0 ? (
          <p>No announcements found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '10px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Text</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Icon</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Created</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Expires</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement) => (
                  <tr key={announcement._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px 15px' }}>
                      {announcement.text.length > 70 
                        ? `${announcement.text.substring(0, 70)}...` 
                        : announcement.text}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      <span style={{
                        padding: '5px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: 
                          announcement.type === 'urgent' ? '#fee2e2' :
                          announcement.type === 'maintenance' ? '#fef3c7' :
                          announcement.type === 'event' ? '#d1fae5' : '#e1f5fe',
                        color: 
                          announcement.type === 'urgent' ? '#b91c1c' :
                          announcement.type === 'maintenance' ? '#b45309' :
                          announcement.type === 'event' ? '#047857' : '#0277bd'
                      }}>
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      <i className={`fas ${announcement.icon}`}></i>
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      <span style={{
                        color: announcement.active ? '#2e7d32' : '#757575',
                        fontWeight: announcement.active ? 'bold' : 'normal'
                      }}>
                        {announcement.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {announcement.expiresAt 
                        ? new Date(announcement.expiresAt).toLocaleDateString() 
                        : 'Never'}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      <button
                        onClick={() => handleEditAnnouncement(announcement)}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '5px'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement._id)}
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
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsManagement;
