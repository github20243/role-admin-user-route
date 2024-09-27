import React from 'react'
import { Route } from 'react-router-dom'
import User from '../../pages/User'

const UserRoutes = () => {
  return (
    <div>
      <Route path="/user" element={<User />} />
    </div>
  )
}

export default UserRoutes
