import React, { useState } from 'react'
import {  useNavigate, Link } from 'react-router-dom';
import POSTRequestFastAPI from '../../helper/POSTFetchFastAPI';
import { useUserIdAppContext } from '../../context/UserProvider'; 
import Header from './HeaderComponent'

function CreateLocal() {
    const navigate = useNavigate();

    const [userIdAPP] = useUserIdAppContext();
    const [localName, setLocalName] = useState('');
    const [localAddress, setLocalAddress] = useState('');
    const [localPhone, setLocalPhone] = useState('');
    const [localOpenTime, setLocalOpenTime] = useState('0:00'); 
    const [localCloseTime, setLocalCloseTime] = useState('23:59');


    const localData = {
        nombre: localName,
        direccion: localAddress,
        telefono: localPhone,
        horario_apertura: localOpenTime,
        horario_cierre: localCloseTime,
        user_id: userIdAPP
    }
    const createLocal = async (event) => {
      event.preventDefault();
      const POSTresponse = await POSTRequestFastAPI('http://127.0.0.1:8000/create_locales',localData);
      if (typeof POSTresponse === 'string') {
        console.log(POSTresponse);
       return;
    }
    if (POSTresponse) {
        console.log(POSTresponse);
        navigate('/dashboard');
        return false;
      }

    // alert('Local creado correctamente');
    
    // setUseApi(true);
    // console.log(POSTresponse);
  }
  return (
    <>
      <Header />
      <form onSubmit={createLocal}>
        <h2>Registra tu local</h2>
        <span>{userIdAPP}</span>
        <input 
          onChange={(e) => setLocalName(e.target.value)}
          value={localName}
          type="text" placeholder="Nombre del local" 
          required/>
        <input 
          onChange={(e) => setLocalAddress(e.target.value)}
          value={localAddress}
          type="text" 
          placeholder="Dirección del local" 
          required/>
        <input 
          onChange={(e) => setLocalPhone(e.target.value)}
          value={localPhone}
          type="text"
          placeholder="Teléfono del local" 
          required/>
        <input 
          onChange={(e) => setLocalOpenTime(e.target.value)}
          value={localOpenTime}
          type="text" 
          placeholder="Horario de apertura del local" />
        <input 
          onChange={(e) => setLocalCloseTime(e.target.value)}
          value={localCloseTime}
          type="text" 
          placeholder="Horario de cierre del local" />
        <br></br>
        <button type='submit'>Crear Local</button>
      </form>

      <Link to = '/dashboard'>volver al dashboad</Link>
    </>
  )
}

export default CreateLocal