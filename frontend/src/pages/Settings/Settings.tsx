import React from 'react'
import { Box, Typography } from '@mui/material'

const Settings: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Settings</Typography>
      <Typography color="text.secondary">This is the Settings page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Settings
