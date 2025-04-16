import React, { useState } from 'react'
import supabase  from '../helper/supabaseClient'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setMessage('');
  
      const {data, error} = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
      });
  
      if (error) {
          setEmail('');
          setPassword('');
          setMessage(error.message);
          return;
      }
      
      if (data) {
          navigate('/dashboard');
          return null;
      }
  
    };
  
    return (
      <>
        <h2>Iniciar Sesión</h2>
        <br></br>
        {message && <span>{message}</span>}
        <form onSubmit={handleSubmit}>
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
          <button type='submit'>Ingresar</button>
        </form>
        <span>Aún no tienes cuenta? </span>
        <Link to = '/register'>Registrarme</Link>
  
      </>
    )
}

export default Login