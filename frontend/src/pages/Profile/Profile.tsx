import React from 'react'
import { Box, Typography } from '@mui/material'

const Profile: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Profile</Typography>
      <Typography color="text.secondary">This is the Profile page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Profile
