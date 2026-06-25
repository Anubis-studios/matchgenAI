import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
    <CircularProgress size={48} sx={{ mb: 2 }} />
    <Typography color="text.secondary">{message}</Typography>
  </Box>
)

export default LoadingSpinner
