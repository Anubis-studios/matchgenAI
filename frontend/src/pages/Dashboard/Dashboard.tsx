import React from 'react'
import { Box, Typography } from '@mui/material'

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Dashboard</Typography>
      <Typography color="text.secondary">This is the Dashboard page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Dashboard
