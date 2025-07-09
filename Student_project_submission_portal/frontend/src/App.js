import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/ui/PrivateRoute';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import ProjectForm from './components/projects/ProjectForm';
import Navbar from './components/ui/Navbar';
import { CustomAlert } from './components/ui/Alert';

function App() {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert(prev => ({ ...prev, open: false }));
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar showAlert={showAlert} />
        <CustomAlert 
          open={alert.open} 
          onClose={handleCloseAlert} 
          message={alert.message} 
          severity={alert.severity} 
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/projects/:id" element={<PrivateRoute><ProjectPage showAlert={showAlert} /></PrivateRoute>} />
          <Route path="/projects/new" element={<PrivateRoute><ProjectForm showAlert={showAlert} /></PrivateRoute>} />
          <Route path="/projects/:id/edit" element={<PrivateRoute><ProjectForm showAlert={showAlert} /></PrivateRoute>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;