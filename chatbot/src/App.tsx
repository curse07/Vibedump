import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatBotUi } from './screens/ChatBotUi';
import { PaymentPage } from './screens/PaymentPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBotUi />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};