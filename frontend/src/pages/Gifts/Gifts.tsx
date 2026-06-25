import React from 'react'
import { Box, Typography } from '@mui/material'

const Gifts: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Gifts</Typography>
      <Typography color="text.secondary">This is the Gifts page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Gifts
