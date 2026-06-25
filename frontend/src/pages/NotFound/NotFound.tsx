import React from 'react'
import { Box, Typography } from '@mui/material'

const NotFound: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>404 Not Found</Typography>
      <Typography color="text.secondary">This is the 404 Not Found page. Implement full UI here.</Typography>
    </Box>
  )
}

export default NotFound
