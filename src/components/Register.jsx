import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
const styles = {
    container: {
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f4f4',
    },
    form: {
      background: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 0 8px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      padding: '12px',
      marginTop: '15px',
      backgroundColor: '#3498db',
      border: 'none',
      color: 'white',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    error: {
      color: '#e74c3c',
      marginTop: '10px',
      textAlign: 'center',
    },
  };
function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/auth/register', form);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>📝 Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
          required
        />

        {error && <p style={styles.error}>{error}</p>}

        <button
          type="submit"
          style={styles.button}
          disabled={!form.name || !form.email || !form.password || loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}



export default Register;
