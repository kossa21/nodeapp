const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
    console.log("a client connected to the endpoint /");
    res.send('Hello World!');
})

app.get('/weather/:cityName', (req, res) => {
    const name = req.params.cityName;
    console.log("a client requested the weather of ", name);

    let city = {
        cityName: name,
        weather: 24.5
    };

    res.send(city)
}) 

app.get('/cities', (req, res) => {
    const name = req.query.name;
    console.log("a client requested the cities");
    res.send(name + ' is awesome!')
}) 



//----------------------------------------------------------------------------
//------------------------------- Calculator ---------------------------------
//----------------------------------------------------------------------------

//------------------------------- Functions ---------------------------------

const addNumbers = (n1, n2, method) => {
    const add = n1 + n2;

    console.log("a client requested the add with "+method);
    return add;
}

const substractNumbers = (n1, n2, method) => {
    const sub = n1 - n2;

    console.log("a client requested the substract with "+method);
    return sub;
}

const multiplyNumbers = (n1, n2, method) => {
    const mult = n1 + n2;

    console.log("a client requested the multiplication with "+method);
    return mult;
}

const divideNumbers = (n1, n2, method) => {
    const div = n1 + n2;

    console.log("a client requested the division with "+method);
    return div;
}

//------------------------------- Endpoints ---------------------------------

app.get('/add/:n1/:n2', (req, res) => {
    const n1 = parseInt(req.params.n1);
    const n2 = parseInt(req.params.n2);

    let total = addNumbers(n1, n2, "params");

    res.send(`The result of adding ${n1}+${n2} is ${total}`)
})

app.get('/add', (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    let total = addNumbers(n1, n2, "query");

    res.send(`The result of adding ${n1}+${n2} is ${total}`)
})

app.get('/sub/:n1/:n2', (req, res) => {
    const n1 = parseInt(req.params.n1);
    const n2 = parseInt(req.params.n2);

    let total = substractNumbers(n1, n2, "params");

    res.send(`The result of substracting ${n1}-${n2} is ${total}`)
})

app.get('/sub', (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    let total = substractNumbers(n1, n2, "params");

    res.send(`The result of substracting ${n1}-${n2} is ${total}`)
})

app.get('/mult/:n1/:n2', (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    let total = multiplyNumbers(n1, n2, "params");

    res.send(`The result of muitiplying ${n1}*${n2} is ${total}`)
})

app.get('/mult', (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    let total = multiplyNumbers(n1, n2, "params");

    res.send(`The result of muitiplying ${n1}*${n2} is ${total}`)
})

app.get('/div/:n1/:n2', (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    let total = divideNumbers(n1, n2, "params");

    res.send(`The result of dividing ${n1}/${n2} is ${total}`)
})

app.get('/div', (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    let total = divideNumbers(n1, n2, "params");

    res.send(`The result of dividing ${n1}/${n2} is ${total}`)
})

//----------------------------Logger------------------------------------

const myLogger = (req, res, next) => {
    const visitTime = new Date();
    console.log(`Visited ${req.url} at ${visitTime.toLocaleString()}`);
    next();
}

app.use(myLogger);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

