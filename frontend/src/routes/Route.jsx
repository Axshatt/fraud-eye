import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import AnalyticsPage from '../Pages/AnalyticsPage';
import AnalyzePage from '../Pages/AnalyzePage';
import ScrollToTop from '../components/ScrollToTop';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
