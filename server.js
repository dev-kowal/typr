const express = require('express');
const app = express()

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))

const title = ['Typr', 'Typr - Test', 'Typr - About']

app.get('/', (req, res) => {
    res.render('index',{title})
})


app.get('/test', (req, res) => {
    res.render('test',{title})
})

app.get('/about', (req, res) => {
    res.render('about',{title})
})

app.listen(3000, () => {
    console.log('listening at port 3000');
})

