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
    const length = req.body.passwordLength;
    const passgen = generator.generate({
        length: length,
        numbers: true,
        symbols: true,
        exclude: "'^¨`,?{}[]()<>.²=+ùµéèç"+'"',
    });
    res.json({password: passgen})
});


app.listen( PORT, () => console.log(`server running on: \nhttp://localhost:${PORT}`));