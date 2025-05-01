import React, { useState, useRef, useEffect } from 'react';
import defaultProfilePic from '../assets/default-profile-pic.jpg';

// Define props interface
interface ProfilePhotoUploaderProps {
  applicationNumber: string;
  onPhotoUpdate: (photoUrl: string) => void;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({ 
  applicationNumber,
  onPhotoUpdate
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string>(defaultProfilePic);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if there's a saved profile picture in localStorage
    const savedProfilePic = localStorage.getItem("profilePic");
    if (savedProfilePic && savedProfilePic !== 'null') {
      setCurrentPhoto(savedProfilePic);
    } else {
      // If no saved picture, try to fetch from backend
      fetchProfilePhoto();
    }
  }, [applicationNumber]);

  const fetchProfilePhoto = async () => {
    if (!applicationNumber) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/students/${applicationNumber}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.student && data.student.profilePhoto) {
          const photoUrl = `http://localhost:5000${data.student.profilePhoto}`;
          setCurrentPhoto(photoUrl);
          localStorage.setItem("profilePic", photoUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0] || !applicationNumber) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('profilePhoto', fileInputRef.current.files[0]);

    try {
      const response = await fetch(`http://localhost:5000/api/students/${applicationNumber}/profile-photo`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update to use full URL including server
        const fullPhotoUrl = `http://localhost:5000${data.profilePhoto}`;
        
        // Update local storage
        localStorage.setItem('profilePic', fullPhotoUrl);
        
        // Update in component state
        setCurrentPhoto(fullPhotoUrl);
        
        // Notify parent component
        onPhotoUpdate(fullPhotoUrl);
        
        alert('Profile photo updated successfully!');
      } else {
        alert('Failed to upload photo. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('An error occurred while uploading your photo.');
    } finally {
      setIsUploading(false);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const photoContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  };

  const photoPreviewStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #c23535',
    marginBottom: '15px'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#c23535',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    fontWeight: 'bold'
  };

  const fileInputStyle: React.CSSProperties = {
    display: 'none'
  };

  const labelStyle: React.CSSProperties = {
    backgroundColor: '#333',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'inline-block'
  };

  return (
    <div style={photoContainerStyle}>
      <h3 style={{ marginBottom: '15px', color: '#333' }}>Profile Photo</h3>
      
      <img 
        src={previewUrl || currentPhoto}
        alt="Profile" 
        style={photoPreviewStyle}
      />
      
      <div style={{ marginTop: '10px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={fileInputStyle}
          id="profile-photo-input"
        />
        <label htmlFor="profile-photo-input" style={labelStyle}>
          Choose Photo
        </label>
        
        {previewUrl && (
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={handleUpload}
              disabled={isUploading}
              style={buttonStyle}
            >
              {isUploading ? 'Uploading...' : 'Save Photo'}
            </button>
            <button 
              onClick={() => setPreviewUrl(null)}
              style={{...buttonStyle, backgroundColor: '#666'}}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px', textAlign: 'center' }}>
        Upload a clear photo of your face.<br/>Maximum size: 5MB
      </p>
    </div>
  );
};

export default ProfilePhotoUploader;