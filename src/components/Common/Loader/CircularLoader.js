import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export default function CircularLoader() {
  return (
    <Box sx={{ display: 'flex' }} className='circle_loader' >
      <CircularProgress />
    </Box>
  );
}