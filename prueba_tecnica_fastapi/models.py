from pydantic import BaseModel
from typing import Optional

class Usuario(BaseModel):
    id: str
    nombre: str
    identificacion: str
    correo: str
    telefono: str

class Vuelo(BaseModel):
    empresa_vuelo: str
    lugar_salida: str
    lugar_llegada: str
    fecha_salida: str
    hora_salida: str
    fecha_llegada: str
    hora_llegada: str
    cupos_disponibles: int
    precio: int

class BusquedaVuelo(BaseModel):
    lugar_salida: str = ''
    lugar_llegada: str = ''
    fecha_salida: str = ''
    fecha_llegada: str = ''

class Reserva(BaseModel):
    user_id: str
    vuelo_id: str
    nombre_reserva: str
    documento_reserva: str

class DeleteReserva(BaseModel):
    reserva_id: str