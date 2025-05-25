import React from 'react';
import Repositories from './Repositories';
import { useNavigate } from 'react-router-dom';
const styles = {
    container: {
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    title: {
      margin: 0,
      color: '#333'
    },
    logoutButton: {
      padding: '8px 16px',
      backgroundColor: '#ff5757',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      cursor: 'pointer'
    },
    repoSection: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 8px rgba(0,0,0,0.1)'
    }
  };
  
function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📁 File Versioning Dashboard</h2>
        <button onClick={logout} style={styles.logoutButton}>🚪 Logout</button>
      </div>

      <div style={styles.repoSection}>
        <Repositories />
      </div>
    </div>
  );
}


export default Dashboard;
