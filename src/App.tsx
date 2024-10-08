// import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/MobileDevice/layoutMobile/Layout";
import { LoginPage } from "./components/MobileDevice/Login/Login";
import { CallbackPage } from "./components/MobileDevice/layoutMobile/Callback";
import AuthLayout from "./components/MobileDevice/layoutMobile/AuthLayout";
import PlayGame from "./components/MobileDevice/PlayGame/PlayGame";
import HomeMobile from "./components/MobileDevice/homeMobile/HomeMobile";
import Marketplace from "./components/MobileDevice/marketplace/Marketplace";
import Document from "./components/MobileDevice/document/Document";
import DailyTask from "./components/MobileDevice/DailyTask/DailyTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            <Route path="/playGame" element={<PlayGame />} />
            <Route path="/task" element={<DailyTask />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/docs" element={<Document />} />
            <Route path="/" element={<HomeMobile />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="callback" element={<CallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
