import React, { useState } from 'react'
import POSTRequestFastAPI from '../helper/POSTFetchFastAPI';
import supabase  from '../helper/supabaseClient'
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [identification, setIdentification] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  

  const createUser = async (userId) => {
    const dataCreateUser = {
      id: userId,
      nombre: name,
      identificacion: identification,
      correo: email,
      telefono: phone
    }
    console.log(dataCreateUser)
    // event.preventDefault();
      const POSTresponse = await POSTRequestFastAPI('http://127.0.0.1:8000/create_usuarios',dataCreateUser);
      if (typeof POSTresponse === 'string') {
        console.log(POSTresponse);
       return;
    }
    if (POSTresponse) {
      console.log(POSTresponse);
      return false;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        setMessage(error.message);
        return;
    }
    if (data?.user?.id) {
      await createUser(data.user.id);
      
      setMessage(`Usuario creado correctamente userId: ${data.user.id}`);
      // Only reset form after everything succeeds
      setEmail('');
      setPassword('');
      setName('');
      setIdentification('');
      setPhone('');

    }
    // setUserId(null);
  };

  return (
    <>
      <h2>Registro</h2>
      <br></br>
      {message && <span>{message}</span>}
      <form onSubmit={handleSubmit}>
        <input
          onChange= {(e) => setName(e.target.value)}
          value={name}
          type='text' placeholder='Nombre'
          required
        />
        <input
          onChange= {(e) => setIdentification(e.target.value)}
          value={identification}
          type='text' placeholder='Documento de Identidad'
          required
        />
        <input
          onChange= {(e) => setPhone(e.target.value)}
          value={phone}
          type='text' placeholder='Telefono celular'
          required
        />
        <input 
          onChange= {(e) => setEmail(e.target.value)}
          value={email}
          type='email' placeholder='Email'
          required
        />
        <input 
          onChange = {(e) => setPassword(e.target.value)}
          value={password}
          type='password' placeholder='Password'
          required
        />
        <button type='submit'>Crear Cuenta</button>
      </form>
      <span>Ya tienes una cuenta? </span>
      <Link to = '/login'>Iniciar Sesion</Link>

    </>
  )
}

export default Register