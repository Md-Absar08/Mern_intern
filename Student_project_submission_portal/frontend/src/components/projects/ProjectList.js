import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ProjectList = ({ projects }) => {
  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project._id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {project.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {project.description.substring(0, 100)}...
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                Created by: {project.author.username}
              </Typography>
              <Link to={`/projects/${project._id}`} style={{ textDecoration: 'none' }}>
                <Typography color="primary" sx={{ mt: 1 }}>
                  View Details
                </Typography>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectList;