import React from 'react'
import { Box, Typography } from '@mui/material'

const WhoLikedMe: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Who Liked Me</Typography>
      <Typography color="text.secondary">This is the Who Liked Me page. Implement full UI here.</Typography>
    </Box>
  )
}

export default WhoLikedMe
