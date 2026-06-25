import React from 'react'
import { Box, Typography, Button } from '@mui/material'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Box sx={{ mb: 2, color: 'primary.main' }}>{icon}</Box>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>{description}</Typography>
    {action && <Button variant="contained" onClick={action.onClick} sx={{ borderRadius: 3 }}>{action.label}</Button>}
  </Box>
)

export default EmptyState
