import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { checkBackendHealth } from './utils/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const renderApp = async () => {
  try {
    const isBackendHealthy = await checkBackendHealth();
    if (!isBackendHealthy) {
      throw new Error('Backend service is not available');
    }

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    root.render(
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ color: '#d32f2f', marginBottom: '20px' }}>Service Unavailable</h1>
        <p style={{ maxWidth: '600px', marginBottom: '20px', color: '#666' }}>
          The application is currently unavailable because it cannot connect to the backend service. 
          This could be due to:
        </p>
        <ul style={{ 
          textAlign: 'left', 
          maxWidth: '500px', 
          marginBottom: '20px',
          color: '#666'
        }}>
          <li>The backend server is not running</li>
          <li>Database connection issues</li>
          <li>Network connectivity problems</li>
        </ul>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Please try again in a few moments.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '12px 24px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
        >
          Retry Connection
        </button>
      </div>
    );
  }
};

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
