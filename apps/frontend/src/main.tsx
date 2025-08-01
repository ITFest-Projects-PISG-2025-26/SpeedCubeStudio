import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages';
import Layout from './layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>
);
