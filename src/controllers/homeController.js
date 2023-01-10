const homeController= async () => {
    const response= await fetch('..//src/components/data/stock.json')
    const data= await response.json()

    return data
};

//1. obtiene el objeto response, 2. ese objeto, esa promesa, se espera que se parsee y una vez que se parsea, 3. Tenemos el array de objetos listo para poder ser recorrido