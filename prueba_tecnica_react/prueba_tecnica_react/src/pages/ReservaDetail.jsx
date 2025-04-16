import React from 'react';
import POSTRequestFastAPI from '../helper/POSTFetchFastAPI';
import { useParams, useNavigate } from 'react-router-dom';

function ReservaDetail() {
  const navigate = useNavigate();
  const { reservaId } = useParams();
  async function handleSubmit(event) {
    event.preventDefault();
    console.log('ReservaId') 
    console.log(reservaId)
    const reservaIdData = {
        reserva_id: reservaId,
    }
    const POSTresponse = await POSTRequestFastAPI('http://127.0.0.1:8000/delete_reserva',reservaIdData);
      if (typeof POSTresponse === 'string') {
        console.log(POSTresponse);
       return;
    }
    if (POSTresponse) {
      console.log(POSTresponse);
      alert('Reserva cancelada correctamente');
      navigate('/dashboard/mis_reservas');
    }
  }
  return (
    <>
        <div>ReservaDetail</div>
        <span>Reserva ID: {reservaId}</span>
        <br/>
        <button style={{ backgroundColor: '#df3535'}} onClick={handleSubmit}>Cancelar Reserva</button>
    </>
  )
}

export default ReservaDetail