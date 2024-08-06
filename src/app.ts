// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from '../src/routes/productRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
