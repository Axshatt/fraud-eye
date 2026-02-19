import React, { useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import CSVUpload from '../components/HomePageComponent/CSVUpload';
import analysisService from '../services/analysisServices';
import AnalysisResults from '../components/AnalysisComponent/AnalysisResults';
import GraphView from '../components/AnalysisComponent/GraphView';
import Papa from 'papaparse';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnalyzePage = () => {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (csvData) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
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
      <div className="page-transition" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Transaction <span style={{ color: 'var(--primary)' }}>Analysis</span></h1>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '40px', 
          alignItems: 'start' 
        }}>
          <CSVUpload onUpload={handleUpload} />
          <GraphView data={{ transactions: data?.transactions || [], analysis }} />
        </div>

        {error && (
          <div style={{ 
            backgroundColor: '#FFF1F0', 
            border: '1px solid #FFA39E', 
            padding: '16px 24px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            color: 'var(--accent)'
          }}>
            <AlertCircle size={20} /> 
            <span style={{ fontWeight: '600' }}>{error}</span>
          </div>
        )}

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
            <div className="spinner" />
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Analyzing transactions...</p>
          </div>
        ) : (
          analysis && <AnalysisResults results={analysis} onDownload={downloadJSON} />
        )}
      </div>
    </MainLayout>
  );
};

export default AnalyzePage;
