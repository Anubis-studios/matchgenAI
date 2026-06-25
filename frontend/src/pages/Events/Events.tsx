import React from 'react'
import { Box, Typography } from '@mui/material'

const Events: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Events</Typography>
      <Typography color="text.secondary">This is the Events page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Events
