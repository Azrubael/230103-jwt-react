import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from './index';
import LoginForm from './components/login-form';
import { IUser } from './models/iuser';
import { observer } from 'mobx-react-lite';
import UserService from './services/user-service';

const App: FC = () => {
  const { store } = useContext(Context)
  const [users, setUsers ] = useState<IUser[]>([])
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    // eslint-disable-next-line
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm/>
        <button onClick={getUsers}>Get users</button>
      </div>
    )
  }

  return (
    <div id="root">
      <h3>{store.isAuth ? `User ${store.user.email} is authorized` : 'Please authorize!'}</h3>
      <h3>{store.user.isActivated ? 'Account verified by email' : 'Please verify Your account!'}</h3>
      <button onClick={() => store.logout()}>Log Out</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map(user => <div key={user.email}>{user.email}</div>)}
    </div>
  )
}

export default observer(App)
