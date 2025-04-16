import React from 'react'

function RenderLocales({ local }){
    return(
        <>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                            <div style={{ flex: "1 1 45%" }}>
                            <h3>{local.nombre}</h3>
                            </div>
                            <div style={{ flex: "1 1 45%"}} >
                            <h4>{local.direccion}</h4>
                            </div>
                        </div>

        </>
    );
}

function ListaLocales({ locales }) {
    const listaLocales = locales.map((local) => {
        return (
            <button  key={local.id}  style={{backgroundColor: ' #b926ee'}} onClick={() => console.log(local.id)} >
                <RenderLocales local = {local}/>
            </button>
        )
    })
  return (
    <div  style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {listaLocales}
    </div>
  )
}

export default ListaLocales