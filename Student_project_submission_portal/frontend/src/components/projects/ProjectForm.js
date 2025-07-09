import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, updateProject, getProject } from '../../services/projects';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const ProjectForm = ({ showAlert }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        try {
          const project = await getProject(id);
          setTitle(project.title);
          setDescription(project.description);
        } catch (err) {
          showAlert('Failed to load project', 'error');
          navigate('/dashboard');
        }
      };
      fetchProject();
    }
  }, [id, isEdit, navigate, showAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProject(id, title, description);
        showAlert('Project updated successfully');
      } else {
        await createProject(title, description);
        showAlert('Project created successfully');
      }
      navigate('/dashboard');
    } catch (err) {
      showAlert(err.response?.data?.message || 'Error saving project', 'error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Project' : 'Create Project'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isEdit ? 'Update Project' : 'Create Project'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProjectForm;