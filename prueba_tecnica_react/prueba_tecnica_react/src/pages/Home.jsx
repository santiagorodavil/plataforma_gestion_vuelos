import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
    <>
        <h1>Bienvenido a Aeronix</h1>
        <h3>Tu mejor opción para volar</h3>

        <p>¿Ya tienes cuenta?</p>
        <Link to = '/login'>Login</Link>
        <br></br>
        <p>¿No tienes cuenta?</p>
        <Link to = '/register'>Registro</Link>
    </>
  )
}

export default Home