import express from "express";
import path from "path";


const app = express();
const viewsPath = path.join(__dirname, '..', 'src');


app.use('/', express.static(path.join(__dirname, '..')));

app.set('views', viewsPath);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(8000, () => {
    console.log('Demo server listening on 8000');
});
