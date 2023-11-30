import './App.css';
import Rotas from './routes';
import { UserContext } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';

function App() {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const token = localStorage.getItem("token");

    //setUserData(token === null ? {} : JSON.parse(token));
    if (token !== null) setUserData(JSON.parse(token));

  },[]);
  return (
    <UserContext.Provider value={{userData, setUserData}}>
    <Rotas/>
    </UserContext.Provider>
  );
}

export default App;
