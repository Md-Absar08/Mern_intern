import { useState } from 'react';
import { addFeedback } from '../../services/feedback';
import { TextField, Button, Box, Typography, Rating } from '@mui/material';

const FeedbackForm = ({ projectId, showAlert }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFeedback(projectId, comment, rating);
      setComment('');
      setRating(5);
      showAlert('Feedback submitted successfully');
    } catch (err) {
      showAlert(err.response?.data?.message || 'Error submitting feedback', 'error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add Your Feedback
      </Typography>
      <Rating
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        precision={1}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Your Comment"
        multiline
        rows={3}
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit Feedback
      </Button>
    </Box>
  );
};

export default FeedbackForm;