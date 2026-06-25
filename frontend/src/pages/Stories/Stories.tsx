import React from 'react'
import { Box, Typography } from '@mui/material'

const Stories: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Stories</Typography>
      <Typography color="text.secondary">This is the Stories page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Stories
