import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext'
import MainLayout from './Layout-components/MainLayout';
import API from './API';
import { LoginComponent } from './Layout-components/LoginComponent';
import { RegisterComponent } from './Layout-components/RegisterComponent';
import HikeDetails from './Layout-components/HikeDetails';
import { HikeDescription } from './Layout-components/HikeDescription';


function App() {

  const [auth, setAuth] = useState({  // login information
    login: false,
    user: undefined,
  });

  const login = async (email, password) => {
    const user = await API.logIn(email, password)
    setAuth({
      login: true,
      user: user,
    });
  };

  const logout = async () => {
    await API.logOut();
    setAuth({
      login: false,
      user: undefined,
    })
  };

  const register = async (credentials) => {
    await API.register(credentials.hash, credentials.salt, credentials.email, credentials.role)
  }

  useEffect(() => {   // check login     
    const checkAuth = async () => {
      const user = await API.getUserInfo();
      if (user) {
        setAuth({
          login: true,
          user: user,
        });
      }
    };
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>   {/* this is used to pass user information*/}
        <AppLayout login={login} logout={logout} register={register}/>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

function AppLayout(props) {
  const auth = useContext(AuthContext);   // contains user information 



  return (
    <Routes>
      <Route path='/' element={
        <MainLayout
          login={props.login}
          logout={props.logout}
        />
      }>
      </Route>
      <Route path='/:hikeID' element={<HikeDetails />} />
      <Route path='/register' element={
        <RegisterComponent register={props.register} />
      } />
      <Route path='/modifyHikeDesc/:hikeId' element={ <HikeDescription /> } />
    </Routes>
  );
}



export default App;
