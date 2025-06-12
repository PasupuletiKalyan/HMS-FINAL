// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Log the current API URL for debugging
console.log('Current API Base URL:', API_BASE_URL);
console.log('Environment:', import.meta.env.VITE_NODE_ENV || 'development');

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    LOGIN: `${API_BASE_URL}/api/login`,
    STUDENTS: `${API_BASE_URL}/api/students`,
    FORM: `${API_BASE_URL}/api/form`,
    PROGRESS: `${API_BASE_URL}/api/progress`,
    COMPLAINTS: `${API_BASE_URL}/api/complaints`,
    HOSTELS: `${API_BASE_URL}/api/hostels`,
    USERS: `${API_BASE_URL}/api/users`,
    WARDEN: `${API_BASE_URL}/api/warden`,
    OCCUPIED_BEDS: `${API_BASE_URL}/api/occupied-beds`,
    ANNOUNCEMENTS: `${API_BASE_URL}/api/announcements`
  }
};

// Helper function to build API URLs
export const buildApiUrl = (path: string): string => {
  return `${API_BASE_URL}${path}`;
};

export default API_CONFIG;
