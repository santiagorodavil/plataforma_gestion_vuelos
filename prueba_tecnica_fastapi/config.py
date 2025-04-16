from supabase import create_client
from dotenv import load_dotenv
import os
import jwt

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
# 1074200


# Función para iniciar sesión y obtener user_id
def login_user(email: str, password: str):
    response = supabase.auth.sign_in_with_password(
        {"email": email, "password": password}
    )
    
    if "error" in response and response["error"]:
        return None, response["error"]["message"]

    access_token = response.session.access_token
    decoded_token = jwt.decode(access_token, options={"verify_signature": False})
    
    return access_token, decoded_token.get("sub")  # Retorna el token y el user_id

# Función para extraer el usuario desde el JWT del header
def get_current_user(authorization: str) -> str:
    if not authorization:
        return None
    print(authorization)
    try:
        token = authorization.split(" ")[1]  # Remover "Bearer "
        decoded_token = jwt.decode(token, options={"verify_signature": False})
        return decoded_token.get("sub")  # Retorna el user_id
    except Exception:
        return None