import React from 'react'
import { Box, Typography } from '@mui/material'

const SuperLikes: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Super Likes</Typography>
      <Typography color="text.secondary">This is the Super Likes page. Implement full UI here.</Typography>
    </Box>
  )
}

export default SuperLikes
