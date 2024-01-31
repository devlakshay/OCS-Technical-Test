import express  from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`listening on the port ${port}`)
});