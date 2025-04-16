import React, { useState } from 'react';
import POSTRequestFastAPI from '../helper/POSTFetchFastAPI';

import { useParams, useNavigate } from 'react-router-dom';
import { useFligthDataContext, useUserIdAppContext} from '../context/UserProvider';



function ReservarVuelo() {
  const [nombreReserva, setNombreReserva] = useState('');
  const [documentoReserva, setDocumentoReserva] = useState('');
  const [fligthData] = useFligthDataContext();
  const [userIdApp] = useUserIdAppContext();
  const { vueloId } = useParams();
  const navigate = useNavigate();

  const vueloActual = fligthData.find(vuelo => vuelo.id === (vueloId))

  const ReservaData = {
    user_id: userIdApp,
    vuelo_id: vueloId,
    nombre_reserva: nombreReserva,
    documento_reserva: documentoReserva,
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('ReservaData')
    console.log(ReservaData)
    const POSTresponse = await POSTRequestFastAPI('http://127.0.0.1:8000/create_reserva',ReservaData);
      if (typeof POSTresponse === 'string') {
        console.log(POSTresponse);
       return;
    }
    if (POSTresponse) {
      console.log(POSTresponse);
      alert('Reserva realizada correctamente');
      setNombreReserva('');
      setDocumentoReserva('');
      navigate('/dashboard');
    }
  }
  return (
    <>
        <h2>ReservarVuelo</h2>
        <span>Empresa: {vueloActual.empresa_vuelo}</span>
            <br/>
            <span>Origen: {vueloActual.lugar_salida} || </span>
            <span>Destino: {vueloActual.lugar_llegada}</span>
            <br/>
            <span>Fecha Salida: {vueloActual.fecha_salida} - {vueloActual.hora_salida} || Fecha Llegada: {vueloActual.fecha_llegada} - {vueloActual.hora_llegada}</span>
            <br/>
            <span>Cupos Disponibles: {vueloActual.cupos_disponibles} || </span>
            <span>Precio: ${vueloActual.precio}  </span>
            <br/>
        <form onSubmit={handleSubmit}>
            <input
                onChange= {(e) => setNombreReserva(e.target.value)}
                value={nombreReserva}
                type='text' placeholder='Nombre Persona a reservar'
                required
            />
            <br/>
            <input
                onChange= {(e) => setDocumentoReserva(e.target.value)}
                value={documentoReserva}
                type='text' placeholder='Documento de Identidad'
                required
            />
            <br/>
            <button type='submit'>Reservar</button>
        </form>

    </>

  )
}

export default ReservarVuelo