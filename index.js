// import dotenv from 'dotenv';
// dotenv.config();
import express  from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import supabase from './config/supabase.js';
import e from "express";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', async (req, res) => {

    const {data, error} = await supabase
    .from('users')
    .select()

    if(error) console.log(error)
    if(data) console.log(data)
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`listening on the port ${port}`)
});