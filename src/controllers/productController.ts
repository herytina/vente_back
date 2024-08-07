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
    const { name,quantiter, price, stock } = req.body;
    const [result] = await pool.query('INSERT INTO products (name,quantiter, price, stock) VALUES (?, ?, ?, ?)', [name, quantiter, price, stock]);
    res.status(201).json({result});
};

export const updateProduct = async (req: Request, res: Response) => {
    const { name,quantiter, price, stock } = req.body;
    const result = await pool.query('UPDATE products SET name = ?, quantiter = ?, price = ?, stock = ? WHERE id = ?', [name,quantiter, price, stock, req.params.id]);
    if (!result) {
        return res.status(404).send('Product not found');
    }
    res.json({ id: req.params.id, name,quantiter, price, stock });
};

export const deleteProduct = async (req: Request, res: Response) => {
    const result = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.status(204).send(result);
};
