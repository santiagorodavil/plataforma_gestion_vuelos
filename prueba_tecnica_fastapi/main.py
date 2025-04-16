import zoneinfo
from datetime import datetime

from fastapi import FastAPI, Header, HTTPException, Depends
from fastapi.responses import JSONResponse

from config import supabase, get_current_user, login_user
from models import  Usuario, Reserva, BusquedaVuelo, DeleteReserva

#permite la interacción de la API con el frontend
from fastapi.middleware.cors import CORSMiddleware


app= FastAPI()

# CORS middleware para permitir solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes poner ["http://localhost:5173"] para ser más seguro
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status":'ok'}


@app.post("/create_usuarios",
          description="Este endpoint permite crear un nuevo usuario en la tabla `usuarios` de Supabase. Envía un objeto JSON con los datos del usuario como _nombre_, _identificacion_, _correo_ y _telefono_.")
async def create_usuario(usuario: Usuario):
    try:
        response = supabase.table("usuarios").insert(usuario.model_dump()).execute()
        print(response)
        return JSONResponse(
            status_code=201,
            content={"message": 'Usuario creado exitosamente', 'data': response.data[0]}
        )
    except Exception as e:
        return {"error": str(e)}

@app.get("/usuarios/{user_id}",
          description="Este endpoint permite obtener un usuario específico de la tabla `usuarios` de Supabase.")
async def get_usuario(user_id: str):
    try:
        response = supabase.table("usuarios").select("*").eq("id", user_id).execute()
        print(response)
        if not response.data:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        return JSONResponse(
            status_code=200,
            content={"message": 'Usuario obtenido exitosamente', 'data': response.data[0]}
        )
    except Exception as e:
        return {"error": str(e)}

@app.get("/vuelos",
          description="Este endpoint permite obtener todos los vuelos disponibles en la tabla `vuelos` de Supabase.")
async def get_vuelos():
    try:
        response = supabase.table("vuelos").select("*").execute()
        print(response)
        return JSONResponse(
            status_code=200,
            content={"message": 'Vuelos obtenidos exitosamente', 'data': response.data}
        )
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/busqueda_vuelos",
          description="Este endpoint permite buscar vuelos en la tabla `vuelos` de Supabase. Envía un objeto JSON con los datos de búsqueda como _lugar_salida_, _lugar_llegada_, _fecha_salida_ y _hora_salida_.")
async def busqueda_vuelos(filtros: BusquedaVuelo):
    filtros = filtros.model_dump()
    print(filtros)
    query = supabase.table("vuelos").select("*")

    # Solo agregamos los filtros que no son None
    for columna, valor in filtros.items():
        if valor != '':
            print(f"Filtro: {columna} = {valor}")
            query = query.eq(columna, valor)

    try:
        response = query.execute()
        print(response)
        return JSONResponse(
            status_code=200,
            content={"message": 'Vuelos obtenidos exitosamente', 'data': response.data}
        )
    except Exception as e:
        return {"error": str(e)}
    

@app.post("/create_reserva",
          description="Este endpoint permite crear una nueva reserva en la tabla `reservas` de Supabase. Envía un objeto JSON con los datos de la reserva como _user_id_, _vuelo_id_ y _asiento_.")
async def create_reserva(reserva: Reserva):
    try:
        existe_usuario = supabase.table("usuarios").select("*").eq("id", reserva.user_id).execute()
        if (not existe_usuario.data):
            raise HTTPException(status_code=404, detail="El usuario no existe")
        
        existe_vuelo = supabase.table("vuelos").select("*").eq("id", reserva.vuelo_id).execute()
        if (not existe_vuelo.data):
            raise HTTPException(status_code=404, detail="El vuelo no existe")
        elif (existe_vuelo.data[0]['cupos_disponibles'] <  1):
            raise HTTPException(status_code=404, detail="No hay cupos disponibles para este vuelo")
        
        # Actualizar la cantidad de cupos disponibles
        nuevo_cupo = existe_vuelo.data[0]['cupos_disponibles'] - 1
        supabase.table("vuelos").update({"cupos_disponibles": nuevo_cupo}).eq("id", reserva.vuelo_id).execute()

        data = {
            "user_id": reserva.user_id,
            "vuelo_id": reserva.vuelo_id,
            "nombre_reserva": reserva.nombre_reserva,
            "documento_reserva": reserva.documento_reserva
        }

        response = supabase.table("reservas").insert(data).execute()
        print(response)

        return JSONResponse(
            status_code=201,
            content={"message": 'Reserva creada exitosamente', 'data': response.data[0]}
        )
    except Exception as e:
        return {"error": str(e)}

@app.get("/reservas/{user_id}",
          description="Este endpoint permite obtener todas las reservas de la tabla `reservas` de Supabase.")
async def get_reservas(user_id: str):
    try:
        # Verificar si el usuario existe
        existe_usuario = supabase.table("usuarios").select("*").eq("id", user_id).execute()
        if (not existe_usuario.data):
            raise HTTPException(status_code=404, detail="El usuario no existe")
        
        response = supabase.table("reservas").select("*").eq("user_id", user_id).execute()
        print(response)
        return JSONResponse(
            status_code=200,
            content={"message": 'Reservas obtenidas exitosamente', 'data': response.data}
        )
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/delete_reserva",
          description="Este endpoint permite eliminar una reserva en la tabla `reservas` de Supabase. Envía un objeto JSON con el id de la reserva a eliminar.")
async def delete_reserva(reserva_id: dict):
    try:
        reserva_id = reserva_id['reserva_id']
        print(reserva_id,'______)()()')
        print('_____'*10)
        # Verificar si la reserva existe
        existe_reserva = supabase.table("reservas").select("*").eq("id", reserva_id).execute()
        if (not existe_reserva.data):
            raise HTTPException(status_code=404, detail="La reserva no existe")
        
        # Obtener el vuelo asociado a la reserva
        vuelo_id = existe_reserva.data[0]['vuelo_id']
        existe_vuelo = supabase.table("vuelos").select("*").eq("id", vuelo_id).execute()
        
        # Actualizar la cantidad de cupos disponibles
        nuevo_cupo = existe_vuelo.data[0]['cupos_disponibles'] + 1
        supabase.table("vuelos").update({"cupos_disponibles": nuevo_cupo}).eq("id", vuelo_id).execute()

        # Eliminar la reserva
        response = supabase.table("reservas").delete().eq("id", reserva_id).execute()
        print(response)

        return JSONResponse(
            status_code=200,
            content={"message": 'Reserva eliminada exitosamente'}
        )
    except Exception as e:
        return {"error": str(e)}
    