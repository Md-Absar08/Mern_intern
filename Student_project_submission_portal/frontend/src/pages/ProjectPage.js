import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject, deleteProject } from '../services/projects';
import { Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import FeedbackList from '../components/feedback/FeedbackList';
import FeedbackForm from '../components/feedback/FeedbackForm';

const ProjectPage = ({ showAlert }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProject(id);
        setProject(data);
      } catch (err) {
        showAlert('Project not found', 'error');
        window.location = '/dashboard';
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, showAlert]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        showAlert('Project deleted successfully');
        window.location = '/dashboard';
      } catch (err) {
        showAlert('Failed to delete project', 'error');
      }
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {project.description}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Created by: {project.author.username}
        </Typography>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/projects/${id}/edit`}
            sx={{ mr: 2 }}
          >
            Edit Project
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete Project
          </Button>
        </Box>

        <Typography variant="h5" gutterBottom>
          Feedback
        </Typography>
        <FeedbackForm projectId={id} showAlert={showAlert} />
        <FeedbackList projectId={id} />
      </Box>
    </Container>
  );
};

export default ProjectPage;