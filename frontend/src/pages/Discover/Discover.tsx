import React from 'react'
import { Box, Typography } from '@mui/material'

const Discover: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Discover</Typography>
      <Typography color="text.secondary">This is the Discover page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Discover
