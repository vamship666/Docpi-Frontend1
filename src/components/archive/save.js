export const sendDataToDjango = async (data) => {
    const response = await fetch('/api/mydata/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  
  sendDataToDjango()
    .then((response) => {
      console.log('Data sent successfully to Django:', response);
    })
    .catch((error) => {
      console.error('Error sending data to Django:', error);
    });
  