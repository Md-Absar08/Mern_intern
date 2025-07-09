import { useEffect, useState } from 'react';
import { Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import ProjectList from '../components/projects/ProjectList';
import { getProjects } from '../services/projects';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Projects
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/projects/new"
          sx={{ mb: 3 }}
        >
          Create New Project
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <ProjectList projects={projects} />
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;