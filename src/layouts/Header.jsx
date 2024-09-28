import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Toolbar, Typography, Button, styled, Box } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const Header = () => {
  const navigate = useNavigate()
  const userInfo = useSelector(state => state.auth.userInfo)

  const handleLogout = async () => {
    try {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userRole')
      navigate('/signup') // Изменено с '/singin' на '/signup'
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Ваш заголовок
          </Typography>
        </Box>
        <LogoutButton
          color="inherit"
          onClick={handleLogout}
          startIcon={<ExitToAppIcon />}
        >
          Выйти
        </LogoutButton>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
}))

const LogoutButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}))