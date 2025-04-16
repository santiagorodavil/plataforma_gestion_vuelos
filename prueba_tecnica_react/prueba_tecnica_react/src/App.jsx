import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider } from './context/UserProvider';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Wrapper from './pages/Wrapper';
import Dashboard from './pages/Dashboard';
import Flights from './pages/Flights';
import Reserves from './pages/Reserves';
import ReservarVuelo from './pages/ReservarVuelo';
import ReservaDetail from './pages/ReservaDetail';

function App() {
  return (
    <AppProvider>
    <BrowserRouter>
      <Routes>
          {/* home */}
          <Route 
            path='/'
            element={<Home />}
          
          />

          {/* register */}
          <Route 
            path='/register'
            element={<Register />}
          />

          {/* login */}
          <Route 
            path='/login'
            element={<Login />}
          />

          {/* dashboard */}
          <Route path='/dashboard/' 
            element={
              <Wrapper>
                <Dashboard />   
              </Wrapper>}/>
                  
          <Route path='dashboard/buscar_vuelos' 
            element={
              <Wrapper>
                <Flights />   
              </Wrapper>}/>
          
          <Route path='/reservar_vuelo/:vueloId' 
            element={
              <Wrapper>
                <ReservarVuelo />   
              </Wrapper>}/>

          <Route path='/dashboard/mis_reservas' 
            element={
              <Wrapper>
                <Reserves />   
              </Wrapper>}/>
          
              <Route path='/dashboard/mis_reservas/:reservaId' 
            element={
              <Wrapper>
                <ReservaDetail />   
              </Wrapper>}/>

      </Routes>
    </BrowserRouter>
    </AppProvider>
  )
}

export default App