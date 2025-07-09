import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuthContext();

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Project Portal
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        {user ? `Hello, ${user.username}!` : 'Share your projects and get feedback'}
      </Typography>
      {!user && (
        <Box>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/login"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            component={Link} 
            to="/signup"
          >
            Sign Up
          </Button>
        </Box>
      )}
      {user && (
        <Button 
          variant="contained" 
          size="large" 
          component={Link} 
          to="/dashboard"
        >
          Go to Dashboard
        </Button>
      )}
    </Box>
  );
};

export default Home;