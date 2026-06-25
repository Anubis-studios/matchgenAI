import React from 'react'
import { Box, Typography } from '@mui/material'

const Admin: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Admin</Typography>
      <Typography color="text.secondary">This is the Admin page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Admin
