import React from 'react'
import { AppBar, Toolbar, Box, Avatar, IconButton, Badge, Chip } from '@mui/material'
import { Notifications, CreditCard } from '@mui/icons-material'
import { useAuthStore } from '../../store/authStore'

const TopBar: React.FC = () => {
  const { user } = useAuthStore()
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
      <Toolbar>
        <Box sx={{ flex: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip icon={<CreditCard />} label={`${user?.credits || 0} credits`} size="small" variant="outlined" />
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error"><Notifications /></Badge>
          </IconButton>
          <Avatar sx={{ bgcolor: 'primary.main' }}>{user?.first_name?.[0]}</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
