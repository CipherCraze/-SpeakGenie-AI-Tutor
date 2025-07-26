import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function SimpleApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎉 App is Working!</h1>
      <p>If you can see this, the basic React setup is working correctly.</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Environment Check:</h3>
        <p>Convex URL: {import.meta.env.VITE_CONVEX_URL ? '✅ Present' : '❌ Missing'}</p>
        <p>Clerk Key: {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? '✅ Present' : '❌ Missing'}</p>
      </div>
      <button 
        onClick={() => alert('Button clicked!')} 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#0066CC', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Button
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SimpleApp />
  </React.StrictMode>,
);
