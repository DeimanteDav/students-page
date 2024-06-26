import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { createPortal } from 'react-dom';

const LoadingBar = () => {
    const [progress, setProgress] = React.useState(0);

    // React.useEffect(() => {
    //   const timer = setInterval(() => {
    //     setProgress((oldProgress) => {
    //       if (oldProgress === 100) {
    //         return 0;
    //       }
    //       const diff = Math.random() * 10;
    //       return Math.min(oldProgress + diff, 100);
    //     });
    //   }, 500);
  
    //   return () => {
    //     clearInterval(timer);
    //   };
    // }, []);

  
    return (
        <Box sx={{ width: '100%', marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
            {/* <LinearProgress variant="determinate" value={progress} /> */}
            <CircularProgress />
        </Box>
    )
}

export default LoadingBar