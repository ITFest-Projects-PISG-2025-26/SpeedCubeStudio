import React from 'react';
import '../styles/globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {children}
    </div>
  );
};

export default Layout;
