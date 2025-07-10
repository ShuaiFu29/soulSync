import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../Button';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/login', label: '登录', variant: 'ghost' },
    { path: '/message-wall', label: '留言墙', variant: 'ghost' },
    { path: '/contact-us', label: '联系我们', variant: 'ghost' },
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo gradient-text" onClick={handleLogoClick}>
        SoulSync
      </div>
      <div className="nav-buttons">
        {navItems.map(item => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? 'primary' : item.variant}
            size="medium"
            onClick={() => navigate(item.path)}
            className={`nav-btn ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
