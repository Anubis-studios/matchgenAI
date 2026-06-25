import React from 'react'
import { Box, Typography } from '@mui/material'

const AIChatStarter: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>AI Chat Starter</Typography>
      <Typography color="text.secondary">This is the AI Chat Starter page. Implement full UI here.</Typography>
    </Box>
  )
}

export default AIChatStarter
