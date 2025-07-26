import React from 'react';

export default function TestPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test Page</h1>
      <p>If you can see this, React is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
}
