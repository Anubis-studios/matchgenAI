import React from 'react'
import { Box, Typography } from '@mui/material'

const Filters: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={ fontWeight: 800, mb: 2 }>Filters</Typography>
      <Typography color="text.secondary">This is the Filters page. Implement full UI here.</Typography>
    </Box>
  )
}

export default Filters
