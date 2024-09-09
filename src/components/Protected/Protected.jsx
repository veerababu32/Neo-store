import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = JSON.parse(sessionStorage.getItem('isAuthenticated')) || false;

    if (authentication && loginStatus !== authentication) {
      navigate('/login');
    } else if (!authentication && loginStatus !== authentication) {
      navigate('/');
    }
  }, [authentication, navigate]);

  return <>{children}</>;
}

export default Protected;
