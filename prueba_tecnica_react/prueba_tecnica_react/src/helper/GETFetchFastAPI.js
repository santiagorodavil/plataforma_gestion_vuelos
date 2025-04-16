async function GETRequestFastAPI(url, parameter) {
    try {
        //Se llama la api y se revisa el estado del request
    const response = await fetch(`${url}/${parameter}`)
    if (!response.ok){
        // throw new Error("Error al obtener los datos")
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.detail || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    //Se vuelve json el response y se modifica el estado de la data
    const data = await response.json();
    return data;
}catch (error){
    return error.message
}
}

export default GETRequestFastAPI;