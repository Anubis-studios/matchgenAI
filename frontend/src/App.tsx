import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Layout from './components/Layout/Layout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Discover from './pages/Discover/Discover'
import Profile from './pages/Profile/Profile'
import Matches from './pages/Matches/Matches'
import Chat from './pages/Chat/Chat'
import Stories from './pages/Stories/Stories'
import Events from './pages/Events/Events'
import WhoLikedMe from './pages/WhoLikedMe/WhoLikedMe'
import Boost from './pages/Boost/Boost'
import SuperLikes from './pages/SuperLikes/SuperLikes'
import Filters from './pages/Filters/Filters'
import AIChatStarter from './pages/AIChatStarter/AIChatStarter'
import VoiceRecorder from './pages/VoiceRecorder/VoiceRecorder'
import Gifts from './pages/Gifts/Gifts'
import Settings from './pages/Settings/Settings'
import Admin from './pages/Admin/Admin'
import NotFound from './pages/NotFound/NotFound'
import { useAuthStore } from './store/authStore'

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/chat/:matchId" element={<Chat />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/events" element={<Events />} />
        <Route path="/who-liked-me" element={<WhoLikedMe />} />
        <Route path="/boost" element={<Boost />} />
        <Route path="/super-likes" element={<SuperLikes />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/ai-chat-starter" element={<AIChatStarter />} />
        <Route path="/voice" element={<VoiceRecorder />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
