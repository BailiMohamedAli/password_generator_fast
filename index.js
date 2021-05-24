const express = require("express");
const app = express();
const path = require("path");
const generator = require('generate-password');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3010;

//data initiator
nav ={
    local: 'home'
}

app.get('/', (req, res) => {
    nav.local = 'home';
    res.render('pages/home', { nav: nav });
});

app.post('/genpass', (req, res) => {
    let length = req.body.passwordLength;
    let exlucion = req.body.symbols ? "'^¨`,?{}[]()<>.²=+ùµéèç;:! *"+'"' : false;
    const passgen = generator.generate({
        length: length,
        numbers: req.body.numb,
        symbols: req.body.symbols,
        exclude: exlucion,
    });
    res.json({password: passgen})
});


app.listen( PORT, () => console.log(`server running on: \nhttp://localhost:${PORT}`));