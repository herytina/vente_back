// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
