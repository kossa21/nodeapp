const express = require('express')
const app = express()
const port = 5000

const myCities = [
    {id:1, cityName: "Valencia", country:"Spain", latitude:39.46, longitude:-0.37, weather:28.5 },
    {id:2, cityName: "Paris", country:"Spain", latitude:48.85, longitude:2.27, weather:24.5 },
    {id:3, cityName: "Estambul", country:"Turkey", latitude:41.04, longitude:28.99, weather:34.5 },
    {id:4, cityName: "Tokyo", country:"Japan", latitude:35.50, longitude:138.64, weather:29.5 },
];

//----------------------------------------------------------
//---------------------- Endpoints -------------------------
//----------------------------------------------------------

//Item 1 of the homework
app.get('/', (req, res) => {
    console.log("a client connected to the endpoint /");

    let filteredCities = myCities.map(element => {
        let {id, country, latitude, longitude, ...rest} = element;
        return rest;
    })
    
    res.send(filteredCities);
})


//Item 2 of the homework 
app.get('/city/:cityName', (req, res) => {
    const name = req.params.cityName.toLowerCase();
    console.log("a client connected to the endpoint /city/:cityName requesting city as params");

    const filteredCitiesArray = myCities.filter(element => element.cityName.toLowerCase() === name);

    const weatherVal = filteredCitiesArray[0].weather;
    const resultObj = {cityName: name, weather: weatherVal};
    
    res.send(resultObj);
})

app.get('/city', (req, res) => {
    const nameRec = req.query.name;

    const latRec = req.query.lat;
    const lonRec = req.query.lon;

    const idRec = req.query.id; 

    // //Item 3 of the homework
    // if(typeof nameRec != undefined){
    //     console.log("I'm receiving a name!");

    //     const name = nameRec.toLowerCase();
        
    //     console.log("a client connected to the endpoint /city requesting city as a query. name: ", name);
    
    //     const filteredCitiesArray = myCities.filter(element => element.cityName.toLowerCase() === name);
        
        // const nameVal = filteredCitiesArray[0].cityName;    
        // const weatherVal = filteredCitiesArray[0].weather;
    //     const resultObj = {cityName: nameVal, weather: weatherVal};
        
    //     res.send(resultObj);
    // }


    //Item 4 of the homework pero no va 
    // if (typeof latRec != undefined && lonRec != undefined){
    //     console.log("I'm receiving a latitude and a longitude!")
        
    //     const lat = parseFloat(latRec);
    //     const lon = parseFloat(lonRec);

    //     const filteredCitiesArray = myCities.filter(element => element.latitude === lat && element.longitude === lon);
    
    //     const weatherVal = filteredCitiesArray[0].weather;
    //     const nameVal = filteredCitiesArray[0].cityName;

    //     const resultObj = {cityName: nameVal, weather: weatherVal};
        
    //     res.send(resultObj);
    // }


    //Item 5 of the homework
    if (typeof idRec != undefined){
        console.log("I'm receiving an id!")
        
        const id = parseInt(idRec);

        const filteredCitiesArray = myCities.filter(element => element.id === id);
    
        const weatherVal = filteredCitiesArray[0].weather;
        const nameVal = filteredCitiesArray[0].cityName;

        const resultObj = {cityName: nameVal, weather: weatherVal};
        
        res.send(resultObj);
    }
})

//Item 4 of the homework
app.get('/city', (req, res) => {
    console.log("A client connected to the endpoint /city requesting latitude and longitude as a query. lon: ", lon, " lat:", lat);
})


//Item 6 of the homework 
app.get('/country/:countryName', (req, res) => {
    console.log("A client connected to the endpoint /country/:countryName");
    const nameRec = req.params.countryName;
    const name = nameRec.toLowerCase();

    const filteredCitiesArray = myCities.filter(element => element.country.toLowerCase() === name);
        
    let resultObj = [];

    filteredCitiesArray.map(element => {
        let weatherVal = element.weather;
        let nameVal = element.cityName;
    
        resultObj.push({cityName: nameVal, weather: weatherVal});
    })
        
    res.send(resultObj);
})


//Item 7 of the homework 
app.get('/city/search/:text', (req, res) => {
    console.log("A client connected to the endpoint /city/search/:text");
    const textRec = req.params.text;
    const text = textRec.toLowerCase();

    const filteredCitiesArray = myCities.filter(element => element.cityName.toLowerCase().includes(text));
        
    let resultObj = [];

    filteredCitiesArray.map(element => {
        let weatherVal = element.weather;
        let nameVal = element.cityName;
    
        resultObj.push({cityName: nameVal, weather: weatherVal});
    })
        
    res.send(resultObj);
})

//-------------------------- Logger --------------------------

const myLogger = (req, res, next) => {
    const visitTime = new Date();
    console.log(`Visited ${req.url} at ${visitTime.toLocaleString()}`);
    next();
}

app.use(myLogger);

app.listen(port, () => console.log(`Homework app listening at http://localhost:${port}`))

