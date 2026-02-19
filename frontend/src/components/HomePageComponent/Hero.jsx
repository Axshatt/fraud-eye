import React from 'react';
import { motion } from 'framer-motion';
import { Database, Activity, ArrowRight } from 'lucide-react';

const Hero = ({ onSampleLoad }) => {
  return (
    <section className="animate-fade-in" style={{ 
      position: 'relative', 
      paddingTop: '100px', 
      paddingBottom: '60px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      textAlign: 'center' 
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '850px' }}
      >
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 20px', 
          borderRadius: '980px', 
          background: 'rgba(0, 113, 227, 0.08)', 
          color: 'var(--primary)', 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '40px' 
        }}>
          <span style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          Bhai, Financial Security is our Top Priority
        </div>
        <h1 className="apple-heading" style={{ 
          fontSize: 'clamp(56px, 10vw, 108px)', 
          lineHeight: '1.02', 
          marginBottom: '32px',
        }}>
          Stop Fraud <br /> 
          <span style={{ color: 'var(--primary)' }}>Instantly.</span>
        </h1>
        <p style={{ 
          fontSize: '22px', 
          color: 'var(--text-secondary)', 
          maxWidth: '650px', 
          margin: '0 auto 48px',
          fontWeight: '500',
          lineHeight: '1.45'
        }}>
          Advanced AML heuristics and relationship mapping to secure your financial ecosystem bhai. Verified & Protected.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ display: 'flex', gap: '20px' }}
      >
        <button 
          onClick={onSampleLoad}
          className="apple-btn"
          style={{ padding: '16px 36px' }}
        >
          <Database size={20} /> Autofill
        </button>
        <a 
          href="#upload" 
          className="apple-btn apple-btn-secondary"
          style={{ textDecoration: 'none', padding: '16px 36px' }}
        >
          <Activity size={20} /> Start Analysis
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
