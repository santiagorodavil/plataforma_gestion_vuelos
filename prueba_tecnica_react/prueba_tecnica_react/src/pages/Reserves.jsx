import React, {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GETRequestFastAPI from '../helper/GETFetchFastAPI';
import { useFligthDataContext, useUserIdAppContext} from '../context/UserProvider';

function RenderReserva({ reserva, info_vuelo }) {
    const infoVueloActual = info_vuelo.find(vuelo => vuelo.id === reserva.vuelo_id);
    return (
        <li key={reserva.id}>
            <span>Vuelo: {infoVueloActual.empresa_vuelo} </span>
            <br/>
            <span>Fecha Salida: {infoVueloActual.fecha_salida} - {infoVueloActual.hora_salida} || </span>
            <span>Fecha Llegada: {infoVueloActual.fecha_llegada}  - {infoVueloActual.hora_llegada} </span>    
            <br/>
            <span>Origen: {infoVueloActual.lugar_salida} || </span>
            <span>Destino: {infoVueloActual.lugar_llegada} </span>
            <br/>
            <span>Nombre: {reserva.nombre_reserva} || </span>
            <span>Documento: {reserva.documento_reserva}</span>
            <br/>
            <Link to={`/dashboard/mis_reservas/${reserva.id}`}>
                <button style={{ backgroundColor: '#df3535'}}>Cancelar Reserva</button>
            </Link>
        </li>
    )
};

function Reserves() {
    const [fligthData] = useFligthDataContext();
    const [userIdApp] = useUserIdAppContext();
    const [error, setError] = useState(null);

    const [reservasData, setReservasData] = useState();

    useEffect(() => {
        const fetchReserveData = async () => {
          try {
            const response = await GETRequestFastAPI('http://127.0.0.1:8000/reservas', userIdApp);
            console.log('Response');
            console.log(response.data);
      
            if (typeof response === 'string') {
              setError(response);
              return;
            }
      
            setReservasData(response.data);
          } catch (e) {
            console.error('Error fetching user data:', e);
          }
        };
      
        fetchReserveData();
      }, [userIdApp]);

  const ListaReserva = reservasData?.map((reserva) => (
        <RenderReserva key={reserva.id} reserva={reserva} info_vuelo = {fligthData} />
    ));

  return (
    <>
        {error && <span>{error}</span>}
        <h3>Mis Reservas</h3>
        <ul>
            {ListaReserva}
        </ul>


    </>
  )
}

export default Reserves