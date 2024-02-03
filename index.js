import express  from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import supabase from './config/supabase.js';
import cors from 'cors';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json())
app.use(express.static('public'));
app.use(cors({ origin: 'http://localhost:3000'}))

app.get('/', async (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

app.post('/table-data', async (req, res) => {
    const userid = req.body.username;
    const password_hash = req.body.password_hash;

    const {data, error} = await supabase
    .from('users')
    .select('userid, password_hash, role')

    if(error) res.json({ success: false, error })
    if(data) {
        const index = data.findIndex(item => (item.userid == userid && item.password_hash == password_hash));

        if(index !== -1) {
            if(data[index].role === 'admin') res.json({ success: true, data })
            else res.json({ success: true, data: [data[index]] })
        }
        else res.json({ success: true, data: [] })
    }
});

app.listen(port, () => {
    console.log(`listening on the port ${port}`)
});