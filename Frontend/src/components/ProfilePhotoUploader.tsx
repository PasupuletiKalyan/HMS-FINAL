import React, { useState, useRef, useEffect } from 'react';
import { buildApiUrl } from '../config/api';
import defaultProfilePic from '../assets/default-profile-pic.jpg';

// Define props interface
interface ProfilePhotoUploaderProps {
  applicationNumber: string;
  onPhotoUpdate: (photoUrl: string) => void;
  userType?: 'student' | 'warden'; // Add userType prop with default to student
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({ 
  applicationNumber,
  onPhotoUpdate,
  userType = 'student' // Default to student if not specified
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string>(defaultProfilePic);
  const [uploadError, setUploadError] = useState<string | null>(null);
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
      console.log(`Fetching profile photo for ${userType} with ID: ${applicationNumber}`);
      
      // Use the appropriate API endpoint based on user type
      const endpoint = userType === 'warden'        ? buildApiUrl(`/api/warden/profile-photo/${applicationNumber}`) 
        : buildApiUrl(`/api/students/${applicationNumber}/profile-photo`);
      
      const response = await fetch(endpoint);
      console.log('Profile photo fetch response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Profile photo fetch response data:', data);
        
        if (data.success && data.profilePhoto) {
          // Handle different response structures
          const photoPath = data.profilePhoto;
            
          if (photoPath) {
            const photoUrl = `${buildApiUrl('')}${photoPath}`;
            console.log('Setting photo URL to:', photoUrl);
            
            // Verify the image exists by attempting to load it
            const img = new Image();
            img.onload = () => {
              console.log('Image loaded successfully');
              setCurrentPhoto(photoUrl);
              localStorage.setItem("profilePic", photoUrl);
            };
            img.onerror = () => {
              console.error('Failed to load image from URL:', photoUrl);
              setCurrentPhoto(defaultProfilePic);
            };
            img.src = photoUrl;
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching ${userType} profile photo:`, error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select an image file.');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File size must be less than 5MB.');
        return;
      }
      
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
    setUploadError(null);
    
    const formData = new FormData();
    formData.append('profilePhoto', fileInputRef.current.files[0]);

    try {
      console.log(`Uploading profile photo for ${userType} with ID: ${applicationNumber}`);
      
      // Use the appropriate API endpoint based on user type
      const endpoint = userType === 'warden'        ? buildApiUrl(`/api/warden/profile-photo/${applicationNumber}`)
        : buildApiUrl(`/api/students/${applicationNumber}/profile-photo`);
      
      console.log('Upload endpoint:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      
      console.log('Upload response status:', response.status);
      
      const data = await response.json();
      console.log('Upload response data:', data);
      
      if (response.ok && data.success) {
        // Update to use full URL including server
        const fullPhotoUrl = `${buildApiUrl('')}${data.profilePhoto}`;
        console.log('Full photo URL:', fullPhotoUrl);
        
        // Add a timestamp to bust cache
        const photoUrlWithTimestamp = `${fullPhotoUrl}?t=${new Date().getTime()}`;
        
        // Update local storage
        localStorage.setItem('profilePic', photoUrlWithTimestamp);
        
        // Update in component state
        setCurrentPhoto(photoUrlWithTimestamp);
        
        // Notify parent component
        onPhotoUpdate(photoUrlWithTimestamp);
        
        alert('Profile photo updated successfully!');
      } else {
        setUploadError(data.message || 'Failed to upload photo. Please try again.');
      }
    } catch (error) {
      console.error(`Error uploading ${userType} profile photo:`, error);
      setUploadError('An error occurred while uploading your photo.');
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
    marginBottom: '20px'  };


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

  const errorStyle: React.CSSProperties = {
    color: '#c23535',
    marginTop: '10px',
    fontSize: '14px',
    textAlign: 'center'
  };

  return (
    <div style={photoContainerStyle}>
      <h3 style={{ marginBottom: '15px', color: '#333' }}>Profile Photo</h3>
      
      <div style={{ 
        width: '120px', 
        height: '120px', 
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #c23535',
        marginBottom: '15px',
        position: 'relative'
      }}>
        <img 
          src={previewUrl || currentPhoto}
          alt="Profile" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            console.log('Image failed to load, setting to default');
            // If image fails to load, set to default
            (e.target as HTMLImageElement).src = defaultProfilePic;
          }}
        />
      </div>
      
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
        
        {uploadError && (
          <div style={errorStyle}>
            {uploadError}
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