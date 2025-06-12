import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../../config/api';
import ResetStudentProgress from '../ResetStudentProgress';

// Interface for real-time statistics
interface DashboardStats {
  totalStudents: number;
  occupiedBeds: number;
  activeBlocks: number;
  totalAnnouncements: number;
  totalComplaints: number;
  pendingComplaints: number;
  occupancyRate: number;
}

const AdminOverview: React.FC = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalStudents: 0,
    occupiedBeds: 0,
    activeBlocks: 0,
    totalAnnouncements: 0,
    totalComplaints: 0,
    pendingComplaints: 0,
    occupancyRate: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Function to fetch real-time dashboard statistics
  const fetchDashboardStats = async () => {
    setIsLoadingStats(true);
    try {
      // Fetch multiple endpoints for comprehensive statistics
      const [hostelStats, occupiedBeds, announcements, complaints] = await Promise.all([
        fetch(buildApiUrl('/api/hostels/statistics/all')),
        fetch(buildApiUrl('/api/occupied-beds')),
        fetch(buildApiUrl('/api/announcements/admin/all')),
        fetch(buildApiUrl('/api/complaints'))
      ]);

      let stats: DashboardStats = {
        totalStudents: 0,
        occupiedBeds: 0,
        activeBlocks: 0,
        totalAnnouncements: 0,
        totalComplaints: 0,
        pendingComplaints: 0,
        occupancyRate: 0
      };

      // Process hostel statistics
      if (hostelStats.ok) {
        const hostelData = await hostelStats.json();
        if (hostelData.success && hostelData.statistics) {
          const allBlocks = hostelData.statistics.allBlocks || [];
          stats.activeBlocks = allBlocks.filter((block: any) => 
            block.floors && block.floors.some((floor: any) => floor.occupiedBeds > 0)
          ).length;
        }
      }

      // Process occupied beds
      if (occupiedBeds.ok) {
        const bedsData = await occupiedBeds.json();
        if (bedsData.success && Array.isArray(bedsData.occupiedBeds)) {
          stats.occupiedBeds = bedsData.occupiedBeds.length;
          stats.totalStudents = bedsData.occupiedBeds.length; // Assuming one student per bed
          
          // Calculate occupancy rate (assuming total capacity of 2000 beds)
          const totalCapacity = 2000;
          stats.occupancyRate = Math.round((stats.occupiedBeds / totalCapacity) * 100);
        }
      }

      // Process announcements
      if (announcements.ok) {
        const announcementData = await announcements.json();
        if (announcementData.success && Array.isArray(announcementData.announcements)) {
          stats.totalAnnouncements = announcementData.announcements.length;
        }
      }

      // Process complaints
      if (complaints.ok) {
        const complaintData = await complaints.json();
        if (complaintData.success && Array.isArray(complaintData.complaints)) {
          stats.totalComplaints = complaintData.complaints.length;
          stats.pendingComplaints = complaintData.complaints.filter(
            (complaint: any) => complaint.status === 'Pending'
          ).length;
        }
      }

      setDashboardStats(stats);
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
      // Keep existing stats on error
    } finally {
      setIsLoadingStats(false);
    }
  };

  return (
    <div className="overview-content">
      {/* Admin Tools Section - Part of Overview only */}
      <div className="admin-tools-section" style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#dc3545', marginBottom: '15px' }}>Admin Tools</h2>
        <ResetStudentProgress />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Admin Dashboard Overview</h1>
          <p>Welcome to the hostel management system admin dashboard.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isLoadingStats && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div className="spinner" style={{
                width: '16px',
                height: '16px',
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <span style={{ fontSize: '14px', color: '#666' }}>Updating...</span>
            </div>
          )}
          <button
            onClick={fetchDashboardStats}
            disabled={isLoadingStats}
            style={{
              padding: '8px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoadingStats ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: isLoadingStats ? 0.7 : 1
            }}
          >
            Refresh Stats
          </button>
        </div>
      </div>
      
      <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div className="stat-card" style={{ 
          backgroundColor: '#f0f8ff', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>Total Students</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#0066cc'
          }}>
            {dashboardStats.totalStudents}
          </p>
          <small style={{ color: '#666' }}>Currently accommodated</small>
        </div>
        
        <div className="stat-card" style={{ 
          backgroundColor: '#fff0f5', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#cc0066' }}>Occupied Beds</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#cc0066'
          }}>
            {dashboardStats.occupiedBeds}
          </p>
          <small style={{ color: '#666' }}>Occupancy: {dashboardStats.occupancyRate}%</small>
        </div>
        
        <div className="stat-card" style={{ 
          backgroundColor: '#f0fff0', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#009900' }}>Active Blocks</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#009900'
          }}>
            {dashboardStats.activeBlocks}
          </p>
          <small style={{ color: '#666' }}>With residents</small>
        </div>
        
        <div className="stat-card" style={{ 
          backgroundColor: '#fff8dc', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#b8860b' }}>Announcements</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#b8860b'
          }}>
            {dashboardStats.totalAnnouncements}
          </p>
          <small style={{ color: '#666' }}>Total posted</small>
        </div>
        
        <div className="stat-card" style={{ 
          backgroundColor: '#ffe4e1', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#dc143c' }}>Total Complaints</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#dc143c'
          }}>
            {dashboardStats.totalComplaints}
          </p>
          <small style={{ color: '#666' }}>
            {dashboardStats.pendingComplaints} pending
          </small>
        </div>
        
        <div className="stat-card" style={{ 
          backgroundColor: '#e6f3ff', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#0080ff' }}>System Status</h3>
          <p className="stat-number" style={{ 
            fontSize: '1.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#00cc00'
          }}>
            ONLINE
          </p>
          <small style={{ color: '#666' }}>
            Last updated: {new Date().toLocaleTimeString()}
          </small>
        </div>
      </div>
      
      {/* Add CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AdminOverview;
