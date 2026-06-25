import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography, Chip } from '@mui/material'
import { Home, Search, Person, Favorite, Chat, PhotoCamera, Event, ThumbUp, Rocket, Star, FilterList, Psychology, Mic, CardGiftcard, Settings, AdminPanelSettings, Logout } from '@mui/icons-material'
import { useAuthStore } from '../../store/authStore'

const menuItems = [
  { label: 'Dashboard', icon: <Home />, path: '/' },
  { label: 'Discover', icon: <Search />, path: '/discover' },
  { label: 'Matches', icon: <Favorite />, path: '/matches' },
  { label: 'Chat', icon: <Chat />, path: '/chat/1' },
  { label: 'Stories', icon: <PhotoCamera />, path: '/stories' },
  { label: 'Events', icon: <Event />, path: '/events' },
  { label: 'Who Liked Me', icon: <ThumbUp />, path: '/who-liked-me' },
  { label: 'Boost', icon: <Rocket />, path: '/boost' },
  { label: 'Super Likes', icon: <Star />, path: '/super-likes' },
  { label: 'Filters', icon: <FilterList />, path: '/filters' },
  { label: 'AI Chat Starter', icon: <Psychology />, path: '/ai-chat-starter' },
  { label: 'Voice', icon: <Mic />, path: '/voice' },
  { label: 'Gifts', icon: <CardGiftcard />, path: '/gifts' },
  { label: 'Profile', icon: <Person />, path: '/profile' },
  { label: 'Settings', icon: <Settings />, path: '/settings' },
  { label: 'Admin', icon: <AdminPanelSettings />, path: '/admin' },
]

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()

  return (
    <Drawer variant="permanent" sx={{ width: 260, flexShrink: 0, '& .MuiDrawer-paper': { width: 260, boxSizing: 'border-box' } }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>MatchGen AI</Typography>
        <Chip label={user?.subscription_tier || 'free'} size="small" color="primary" sx={{ mt: 1 }} />
      </Box>
      <Divider />
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5, '&.Mui-selected': { bgcolor: 'primary.50', color: 'primary.main' } }}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logout} sx={{ borderRadius: 2, mx: 1, color: 'error.main' }}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar
