import React from 'react';

const MainLayout = ({ children }) => {
  const layoutStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'var(--background)',
    color: 'var(--text)'
  };

  const navStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const mainStyle = {
    flexGrow: 1,
    paddingTop: '80px',
    paddingBottom: '60px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    paddingLeft: '24px',
    paddingRight: '24px'
  };

  const footerStyle = {
    borderTop: '1px solid var(--border)',
    padding: '48px 24px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%'
  };

  return (
    <div style={layoutStyle}>
      <header className="glass-nav">
        <div style={navStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'var(--primary)', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>F</span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em' }}>
              FraudWatch
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#upload" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>Analyze</a>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>History</a>
            <button className="apple-btn" style={{ padding: '8px 16px', fontSize: '14px' }}>Get Started</button>
          </div>
        </div>
      </header>

      <main style={mainStyle}>
        {children}
      </main>

      <footer style={footerStyle}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: 'var(--text-secondary)',
          fontSize: '13px'
        }}>
          <div>
            <span style={{ fontWeight: '600' }}>FRAUDWATCH © 2026</span>
          </div>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
