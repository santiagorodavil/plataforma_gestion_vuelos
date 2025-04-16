async function POSTRequestFastAPI(url, data) {
    try {
      // alert(JSON.stringify(data))
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }
  
      const responseData = await response.json();
      return { success: true, data: responseData, error: null };
  
    } catch (error) {
      // Error de red, de conexión, etc.
      return { success: false, data: null, error: error.message };
    }
  }

export default POSTRequestFastAPI;