import React from 'react'
import { Box, Typography } from '@mui/material'

const Login: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Login</Typography>
      <Typography color="text.secondary">This is the Login page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Login
