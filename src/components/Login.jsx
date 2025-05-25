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
    backgroundColor: '#4CAF50',
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
  linkText: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
  },
  linkButton: {
    border: 'none',
    background: 'none',
    color: '#3498db',
    cursor: 'pointer',
    padding: '0',
    marginLeft: '5px',
    textDecoration: 'underline',
    fontSize: '14px',
  },
};

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      console.log('Login successful:', res.data);
      
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>🔐 Login</h2>

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
          disabled={!form.email || !form.password || loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

       
        <div style={styles.linkText}>
          Don't have an account?
          <button onClick={() => navigate('/register')} style={styles.linkButton}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
