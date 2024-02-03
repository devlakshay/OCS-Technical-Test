import express  from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import supabase from './config/supabase.js';
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000'}))

app.get('/', async (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

app.post('/table-data', async (req, res) => {

    console.log('hit');

    const userid = req.body.username;
    const password_hash = req.body.password_hash;

    const {data, error} = await supabase
    .from('users')
    .select()

    console.log(data);

    if(error) res.sendStatus(500)
    if(data) res.send(JSON.stringify({ success: true, data }))
    

});

app.listen(port, () => {
    console.log(`listening on the port ${port}`)
});