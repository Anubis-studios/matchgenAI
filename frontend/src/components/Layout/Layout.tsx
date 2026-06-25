import React from 'react'
import { Box } from '@mui/material'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <Box component="main" sx={{ flex: 1, p: 3, bgcolor: 'grey.50' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
