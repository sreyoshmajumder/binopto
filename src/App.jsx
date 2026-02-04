import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Mining from './pages/Mining';
import AssistantWidget from './components/AssistantWidget';

function AnimatedRoutes() {
  const location = useLocation();
  const MDiv = motion.div;
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <MDiv initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <Landing />
            </MDiv>
          }
        />
        <Route
          path="/mining"
          element={
            <MDiv initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <Mining />
            </MDiv>
          }
        />
        <Route
          path="/login"
          element={
            <MDiv initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <Login />
            </MDiv>
          }
        />
        <Route
          path="/signup"
          element={
            <MDiv initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <Signup />
            </MDiv>
          }
        />
        
        
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
        <div className="min-h-screen bg-corporate-bg text-corporate-text font-sans selection:bg-corporate-gold selection:text-white vfx-noise">
            <Navbar />
            <AnimatedRoutes />
            <AssistantWidget />
        </div>
    </Router>
  );
}

export default App;
