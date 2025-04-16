import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import POSTRequestFastAPI from '../helper/POSTFetchFastAPI';
import { useFligthDataContext } from '../context/UserProvider';  // Importa el proveedor de contexto

function RenderVuelo({ vuelo }) {
    return <option value={vuelo.lugar_salida}>{vuelo.lugar_salida}</option>
  }

function RenderVueloDestino({ vuelo }) {
    return <option value={vuelo.lugar_llegada}>{vuelo.lugar_llegada}</option>
  }

function RenderResultadoBusqueda({ vuelo }) {
    return (
        <li key={vuelo.id}>
            <span>Empresa: {vuelo.empresa_vuelo}</span>
            <br/>
            <span>Origen: {vuelo.lugar_salida} || </span>
            <span>Destino: {vuelo.lugar_llegada}</span>
            <br/>
            <span>Fecha Salida: {vuelo.fecha_salida} - {vuelo.hora_salida} || Fecha Llegada: {vuelo.fecha_llegada} - {vuelo.hora_llegada}</span>
            <br/>
            <span>Cupos Disponibles: {vuelo.cupos_disponibles} || </span>
            <span>Precio: ${vuelo.precio}  </span>
            <br/>
            <Link to={`/reservar_vuelo/${vuelo.id}`}>
                <button>Reservar</button>
            </Link>
        </li>
    )
}

function Flights() {
  const [fligthData] = useFligthDataContext();
  const [fechaSalida, setFechaSalida] = useState('');
  const [fechaLlegada, setFechaLlegada] = useState('');
  const [ciudadOrigen, setCiudadOrigen] = useState('');
  const [ciudadDestino, setCiudadDestino] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState([{id:0, empresa_vuelo:'Aun no hay resultados'}]);

  const consultaVuelosData = {
    lugar_salida: ciudadOrigen,
    lugar_llegada: ciudadDestino,
    fecha_salida: fechaSalida,
    fecha_llegada: fechaLlegada
  }

  const consultaVuelosAPI = async (event) => {
    event.preventDefault();
    const POSTresponse = await POSTRequestFastAPI('http://127.0.0.1:8000/busqueda_vuelos', consultaVuelosData);
    if (typeof POSTresponse === 'string') {
      console.log(POSTresponse);
     return;
  }
  if (POSTresponse) {
    console.log('-----')
      console.log(POSTresponse.data.data);
      if (POSTresponse.data.data.length === 0) {
        alert('No se encontraron vuelos para la búsqueda');
        setResultadoBusqueda(['No se encontraron vuelos para la búsqueda']);
      }

      setResultadoBusqueda(POSTresponse.data.data);

      return false;
    }

}



  const ListaVuelosSalida = fligthData.map((vuelo) => {
    return (
        <RenderVuelo key={vuelo.id} vuelo={vuelo} />
    )
    });
  
    
  const ListaVuelosLlegada = fligthData.map((vuelo) => {
        return (
            <RenderVueloDestino key={vuelo.id} vuelo={vuelo} />
        )
        });
  
  const ResultadoBusquedaTotal = resultadoBusqueda.map((vuelo) => {
    return (
        <RenderResultadoBusqueda key={vuelo.id} vuelo={vuelo} />
    )
  });

  return (
    <div>
        <div>Flights</div>
        <h2>Busca tu vuelo</h2>
        <span>Fecha Salida:</span> 
        <input type='date' 
            placeholder='Fecha salida' 
            value={fechaSalida}
            onChange={(e) => setFechaSalida(e.target.value)}/>
        <br></br>
        <span>Fecha Llegada: </span>
        <input type='date'
             placeholder='Fecha llegada' 
             value={fechaLlegada}
             onChange={(e) => setFechaLlegada(e.target.value)}/>
        <br></br>
        <span>Ciudad Origen: </span>
        <select onChange={(e) => setCiudadOrigen(e.target.value)}>
            <option value=''>Selecciona una ciudad</option>
            {ListaVuelosSalida}
        </select>
        <br></br>
        <span>Ciudad Destino: </span>
        <select onChange={(e) => setCiudadDestino(e.target.value)}>
            <option value=''>Selecciona una ciudad</option>
            {ListaVuelosLlegada}
        </select>
        <br></br>
        <button 
            onClick={consultaVuelosAPI}
            disabled={ciudadOrigen === '' && ciudadDestino === '' && fechaLlegada === '' && fechaSalida === ''}
            >
                Consultar Vuelos
        </button>
        <hr/>
        <h3>Resultados de la búsqueda</h3>
        <ul>
            {ResultadoBusquedaTotal}
        </ul>
    </div>
  )
}

export default Flights