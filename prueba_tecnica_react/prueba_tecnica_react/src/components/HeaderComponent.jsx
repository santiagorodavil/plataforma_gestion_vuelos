import React from 'react';
import supabase  from '../helper/supabaseClient';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router';
// import './prueba.css'

  
  
function Header() {
  const navigate = useNavigate();
  const singOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
    // setUserData(null);
    navigate('/login');
  }

  const navHome = () => {
    navigate('/dashboard');
  }

  return (
    <aside>
      <div>
        <h1 className="sidebar-title">Aeronix</h1>
        <nav className="sidebar-nav">
          {/* <Link to="/" className="sidebar-link">Inicio</Link>
          <Link to="/usuarios" className="sidebar-link">Usuarios</Link>
          <Link to="/reportes" className="sidebar-link">Reportes</Link>
          <Link to="/configuracion" className="sidebar-link">Configuración</Link> */}
          <button className="sidebar-link" onClick={navHome}>Inicio</button>
          <button className="sidebar-link" onClick={singOut}>Cerrar Sesión</button>
          
        </nav>
      </div>
    </aside>  

  )
}

export default Header