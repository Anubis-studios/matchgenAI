import React from 'react'
import { Box, Typography } from '@mui/material'

const Chat: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Chat</Typography>
      <Typography color="text.secondary">This is the Chat page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Chat
