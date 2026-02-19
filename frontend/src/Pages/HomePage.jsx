import React, { useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import CSVUpload from '../components/HomePageComponent/CSVUpload';
import Hero from '../components/HomePageComponent/Hero';
import FAQ from '../components/HomePageComponent/FAQ';
import analysisService from '../services/analysisServices';
import AnalysisResults from '../components/AnalysisComponent/AnalysisResults';
import GraphView from '../components/AnalysisComponent/GraphView';
import Papa from 'papaparse';
import { AlertCircle } from 'lucide-react';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (csvData) => {
    setLoading(true);
    setError(null);
    setAnalysis(null); // Reset analysis on new upload
    try {
      const transactions = csvData.filter(row => row.transaction_id || row.TransactionID).map(row => ({
        transaction_id: row.transaction_id || row.TransactionID,
        sender_id: row.sender_id || row.SenderID,
        receiver_id: row.receiver_id || row.ReceiverID,
        amount: parseFloat(row.amount || row.Amount),
        timestamp: row.timestamp || row.Timestamp || new Date().toISOString()
      }));

      if (transactions.length === 0) {
        throw new Error("No valid transactions found in CSV bhai.");
      }

      setData({ transactions });
      const result = await analysisService.analyzeTransactions(transactions);
      setAnalysis(result.data);
    } catch (err) {
      setError(err.message || "Failed to analyze data. Please check CSV format bhai.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateSampleData = async () => {
    try {
      const response = await fetch('/transactions.csv');
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          handleUpload(results.data);
        },
        error: (err) => {
          setError("Failed to parse sample data bhai.");
        }
      });
    } catch (err) {
      setError("Failed to fetch sample data bhai.");
      console.error(err);
    }
  };

  const downloadJSON = () => {
    if (!analysis) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "fraud_analysis.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {/* Hero Section */}
        <Hero onSampleLoad={generateSampleData} />

        {/* Upload/Graph Section */}
        <div id="upload" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '40px', 
          alignItems: 'start' 
        }}>
          <CSVUpload onUpload={handleUpload} />
          <GraphView data={{ transactions: data?.transactions || [], analysis }} />
        </div>

        {/* Error State */}
        {error && (
          <div style={{ 
            backgroundColor: '#FFF1F0', 
            border: '1px solid #FFA39E', 
            padding: '16px 24px', 
            borderRadius: '12px', 
            display: 'flex', 
            itemsCenter: 'center', 
            gap: '12px', 
            color: 'var(--accent)'
          }}>
            <AlertCircle size={20} /> 
            <span style={{ fontWeight: '600' }}>{error}</span>
          </div>
        )}

        {/* Analysis Loading/Results */}
        {loading ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '60px', 
            gap: '24px', 
            background: 'var(--card)',
            borderRadius: '24px',
            border: '1px solid var(--border)'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '3px solid rgba(0, 113, 227, 0.1)', 
              borderTopColor: 'var(--primary)', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }} />
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Analyzing transactions...</p>
            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </div>
        ) : (
          analysis && <AnalysisResults results={analysis} onDownload={downloadJSON} />
        )}

        {/* FAQ Section */}
        <FAQ />
      </div>
    </MainLayout>
  );
};

export default HomePage;
