// src/controllers/productController.ts
import { Request, Response } from 'express';
import pool from '../dbConfig';
import { Product } from '../models/produits';

export const getProducts = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
};

export const getProductById = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    const products: Product[] = rows as Product[];
    if (products.length === 0) {
        return res.status(404).send('Product not found');
    }
    res.json(products[0]);
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, nbStock } = req.body;
    const [result] = await pool.query('INSERT INTO products (name, price, nbStock) VALUES (?, ?, ?)', [name, price, nbStock]);
    res.status(201).json({result});
};

export const updateProduct = async (req: Request, res: Response) => {
    const { name, price, nbStock } = req.body;
    const [result] = await pool.query('UPDATE products SET name = ?, price = ?, nbStock = ? WHERE id = ?', [name, price, nbStock, req.params.id]);
    const products: Product[] = result as Product[];
    if (products) {
        return res.status(404).send('Product not found');
    }
    res.json({ id: req.params.id, name, price, nbStock });
};

export const deleteProduct = async (req: Request, res: Response) => {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    const products: Product[] = result as Product[];
    if (products) {
        return res.status(404).send('Product not found');
    }
    res.status(204).send();
};
