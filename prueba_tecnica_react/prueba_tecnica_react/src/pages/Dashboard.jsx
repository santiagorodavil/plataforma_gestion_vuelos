import supabase  from '../helper/supabaseClient';
import GETRequestFastAPI from '../helper/GETFetchFastAPI';
import { useUserAppContext, useUserIdAppContext, useFligthDataContext } from '../context/UserProvider';  // Importa el proveedor de contexto

import React, {useState, useEffect} from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router';
import { Link } from 'react-router-dom';


import Header from '../components/HeaderComponent';
// import ListaLocales from '../components/ListaLocalesComponent';

function Dashboard({ userId }) { 
  const [userData, setUserData] = useUserAppContext();
  const [userIdApp, setUserIdApp] = useUserIdAppContext();
  const [fligthData, setFligthData] = useFligthDataContext();


  const [error, setError] = useState(null);
  const [useApi, setUseApi] = useState(true);

  const navigate = useNavigate();

  const singOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
    setUserData(null);
    navigate('/login');
  }

  const navSearchFlights = () => {
    navigate('buscar_vuelos');
  }

  const navMyReserve = () => {
    navigate('/dashboard/mis_reservas');
  }

  useEffect(() => {
    try{
        // Crea la función fetchUserData que no se ejecuta hasta que se llame la función 
        const fetchUserData = async () => {
            setUserIdApp(userId);
            const response = await GETRequestFastAPI('http://127.0.0.1:8000/usuarios', userId);
            if (typeof response === 'string') {
            setError(response);
            //   setUserData({nombre: response});
            console.log(response)
            return;
            }
            setUserData(response.data)
            setUseApi(false)
            // console.log(response);
            // console.log(userIdApp)
            // console.log('++++++++++')
            // console.log(typeof response)
        };

        const fetchFligthData = async () => {
          const response = await GETRequestFastAPI('http://127.0.0.1:8000/vuelos', '');
          if (typeof response === 'string') {
            setError(response);
            //   setUserData({nombre: response});
            console.log(response)
            return;
            }
          setFligthData(response.data)
          setUseApi(false)
          // console.log(response.data);
          // console.log(fligthData)
        };

        fetchUserData();
        fetchFligthData();
   }
    catch (e) {
        console.error('Error fetching user data:', e);
        setError('Error fetching user data');
    }
  }, [useApi, userId, setUserData, setUserIdApp, setFligthData]);
  console.log(fligthData)
  if (userData ===null) {
    return(
      <>
        <Header />
        {error && <span>{error}</span>}
        <h1>Al parecer no tienes Locales creados,{userId}</h1>
        <button onClick={navSearchFlights}>Crear Local</button>
        <button onClick={singOut}>Cerrar Sesión</button>
      </>
    )
  }
  else{
  return (
    <>
        {error && <span>{error}</span>}
      <h1>{userData.nombre}, Bienvenido al portal de reservas de vuelos</h1>
      <h2>Qué quieres hacer el día de hoy?</h2>
      <button onClick={navSearchFlights}>Buscar vuelos</button>
      <button onClick={navMyReserve}>Ver mis reservas</button>
      {/* <ul>
        {userData.map((local) => (
          <li key={local.id}>
            <button onClick={() => console.log(local)}>
              {local.nombre}
            </button>
          </li>
        ))}
      </ul>
      < ListaLocales locales={userData} /> */}
       <span>{userIdApp}</span>
       <br></br>
       {/* <button onClick={singOut}>Cerrar Sesión</button> */}
       <Outlet />
       
    </>
  )
}
}

export default Dashboard