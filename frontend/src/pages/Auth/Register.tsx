import React from 'react'
import { Box, Typography } from '@mui/material'

const Register: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Register</Typography>
      <Typography color="text.secondary">This is the Register page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Register
