import React from 'react'
import { Box, Typography } from '@mui/material'

const Matches: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Matches</Typography>
      <Typography color="text.secondary">This is the Matches page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Matches
