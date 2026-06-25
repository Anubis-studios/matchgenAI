import React from 'react'
import { Box, Typography } from '@mui/material'

const Boost: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Boost</Typography>
      <Typography color="text.secondary">This is the Boost page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Boost
