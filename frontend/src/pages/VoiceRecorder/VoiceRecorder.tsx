import React from 'react'
import { Box, Typography } from '@mui/material'

const VoiceRecorder: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Voice Recorder</Typography>
      <Typography color="text.secondary">This is the Voice Recorder page. Implement full UI here.</Typography>
    </Box>
  )
}

export default VoiceRecorder
