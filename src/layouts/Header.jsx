import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions/authActions' // Предполагается, что у вас есть такой action
import { AppBar, Toolbar, Typography, Button, styled } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.auth.userInfo) // Предполагается, что у вас есть такой state

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      navigate('/login')
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Мое приложение
        </Typography>
        {userInfo && (
          <UserInfo>
            <Typography variant="subtitle1">
              {userInfo.email}
            </Typography>
            <LogoutButton
              color="inherit"
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
            >
              Выйти
            </LogoutButton>
          </UserInfo>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
}))

const UserInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
})

const LogoutButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}))