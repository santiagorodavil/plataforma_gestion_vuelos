# Plataforma de Gestión de Vuelos ✈️

Este proyecto es una plataforma de gestión de vuelos compuesta por un frontend desarrollado en React y un backend desarrollado en FastAPI.

---

## 📁 Estructura del proyecto

.
├── prueba_tecnica_react/      # Frontend en React
├── prueba_tecnica_fastapi/    # Backend en FastAPI
└── [README.md](http://readme.md/)

---

## 🧪 Tecnologías utilizadas

- ⚛️ React (Vite)
- 🐍 FastAPI
- 🔐 Archivos `.env` para configuración
- 📦 npm + pip

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone <https://github.com/tu_usuario/plataforma_gestion_vuelos.git>
cd plataforma_gestion_vuelos
```

### **2. Configura las variables de entorno**

Cada carpeta tiene su archivo .env que **no está incluido** en este repo por seguridad.

Copia los archivos .env que se te van a enviar por correo y pegalos en las siguientes rutas:

```python
# Para React
cp prueba_tecnica_react/prueba_tecnica_react/.env

# Para FastAPI
cp prueba_tecnica_fastapi/.env
```

### **3. Inicia el backend (FastAPI)**

```python
cd prueba_tecnica_fastapi
pip install -r requirements.txt
uvicorn main:app --reload
```

Asegurate de tener Python 3.9+ y los paquetes requeridos.

### **4. Inicia el frontend (React)**

```python
cd prueba_tecnica_react
npm install
npm run dev
```

> Asegurate de que la variable REACT_APP_API_URL apunte al backend (por ejemplo, [http://localhost:8000](http://localhost:8000/))
>