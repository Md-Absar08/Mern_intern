import { useEffect, useState } from 'react';
import { getFeedback } from '../../services/feedback';
import { Box, Typography, Divider, Rating, CircularProgress } from '@mui/material';

const FeedbackList = ({ projectId }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getFeedback(projectId);
        setFeedback(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [projectId]);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {feedback.length} Feedback Items
      </Typography>
      {feedback.map((item) => (
        <Box key={item._id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">
            {item.author.username}
          </Typography>
          <Rating value={item.rating} readOnly precision={0.5} />
          <Typography variant="body1" sx={{ mt: 1 }}>
            {item.comment}
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default FeedbackList;