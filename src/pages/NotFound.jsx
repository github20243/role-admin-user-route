import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled, keyframes } from '@mui/material/styles'
import { Typography, Box } from '@mui/material'

const NotFound = () => {
  const [countdown, setCountdown] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1)
    }, 1000)

    const redirect = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirect)
    }
  }, [navigate])

  return (
    <StyledBox>
      <Content>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Страница не найдена
        </Typography>
        <Typography variant="body1">
          Перенаправление на главную страницу через {countdown} секунд...
        </Typography>
      </Content>
    </StyledBox>
  )
}

export default NotFound

const pulseAura = keyframes`
  0% { 
    filter: drop-shadow(0 0 0 rgba(128, 0, 128, 0.7)) brightness(1);
    transform: scale(1);
  }
  50% { 
    filter: drop-shadow(0 0 50px rgba(128, 0, 128, 0.9)) brightness(1.2);
    transform: scale(1.05);
  }
  100% { 
    filter: drop-shadow(0 0 0 rgba(128, 0, 128, 0.7)) brightness(1);
    transform: scale(1);
  }
`

const StyledBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `url('https://i.pinimg.com/736x/80/dc/3e/80dc3eeb68bc30c0d49dc985dcdc7d08.jpg') no-repeat center center`,
    backgroundSize: 'cover',
    animation: `${pulseAura} 2s infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(128, 0, 128, 0.3) 0%, rgba(128, 0, 128, 0) 70%)',
    animation: `${pulseAura} 2s infinite alternate`,
  },
}))

const Content = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: '#00ff00',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  '& h1': {
    fontSize: '6rem',
    marginBottom: theme.spacing(2),
  },
  '& h2': {
    marginBottom: theme.spacing(4),
  },
}))