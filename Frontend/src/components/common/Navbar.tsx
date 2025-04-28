import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

interface NavbarProps {
  activePage: string;
  userType: 'student' | 'warden' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ activePage, userType }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    // Redirect to login page
    window.location.href = '/login';
  };
  
  const getNavItems = () => {
    switch (userType) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/student-dashboard', id: 'dashboard' },
          { name: 'Hostel Booking', path: '/hostel-booking', id: 'hostel-booking' },
          { name: 'My Booking', path: '/current-booking', id: 'current-booking' },
          { name: 'Notices', path: '/notices', id: 'notices' },
          { name: 'Complaints', path: '/complaints', id: 'complaints' },
          { name: 'Profile', path: '/profile', id: 'profile' },
        ];
      case 'warden':
        return [
          { name: 'Dashboard', path: '/warden-dashboard', id: 'dashboard' },
          { name: 'Students', path: '/students', id: 'students' },
          { name: 'Rooms', path: '/rooms', id: 'rooms' },
          { name: 'Notices', path: '/notices', id: 'notices' },
          { name: 'Complaints', path: '/complaints', id: 'complaints' },
          { name: 'Search Student', path: '/search-student', id: 'search-student' },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin-dashboard', id: 'dashboard' },
          { name: 'Users', path: '/users', id: 'users' },
          { name: 'Hostel Management', path: '/hostel-management', id: 'hostel-management' },
          { name: 'Reports', path: '/reports', id: 'reports' },
        ];
      default:
        return [];
    }
  };
  
  const navItems = getNavItems();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to={`/${userType}-dashboard`}>HMS</Link>
        </div>
        
        <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id} className={activePage === item.id ? 'active' : ''}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
          <li className="nav-logout">
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
