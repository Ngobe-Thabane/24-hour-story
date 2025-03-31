import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set the interval to update the progress every 100ms
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);  // Clear the interval when progress reaches 100
          return 100;
        }
        return prev + 1;  // Increment progress by 1
      });
    }, 30);  // 3000ms / 100ms = 30 updates for 3 seconds

    return () => clearInterval(intervalId);  // Cleanup on component unmount
  }, []);

  return (
    <Box>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

