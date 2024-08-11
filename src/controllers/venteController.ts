// src/controllers/venteController.ts
import { Request, Response } from 'express';
import pool from '../utils/dbConfig';
import { Vente } from '../models/vente';

// Helper function to convert JSON array to SQL array
const convertToSqlArray = (arr: number[]): string => {
    return JSON.stringify(arr);
};

export const getVentes = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM ventes');
    const ventes = rows as Vente[]
    res.json(ventes);
};

export const getVenteById = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM ventes WHERE id = ?', [req.params.id]);
    const ventes = rows as Vente[]
    if (ventes.length === 0) {
        return res.status(404).send('Vente not found');
    }
    res.json(ventes[0]);
};

export const createVente = async (req: Request, res: Response) => {
    const { idCli, idProdEn, idSociete } = req.body;
    const idProdEnStr = convertToSqlArray(idProdEn);
    const date = new Date().toLocaleDateString()
    const [result] = await pool.query('INSERT INTO ventes (idCli, idProdEn, idVendeur, createdDate) VALUES (?, ?, ?, ?)', [idCli, idProdEnStr, idSociete, date]);
    res.status(201).json(result);
};

export const updateVente = async (req: Request, res: Response) => {
    const { idCli, idProdEn, idSociete } = req.body;
    const idProdEnStr = convertToSqlArray(idProdEn);
    const [result] = await pool.query('UPDATE ventes SET idCli = ?, idProdEn = ?, idSociete = ? WHERE id = ?', [idCli, idProdEnStr, idSociete, req.params.id]);
    if (!result) {
        return res.status(404).send('Vente not found');
    }
    const updatedVente: Vente = { id: parseInt(req.params.id), idCli, idProdEn, idSociete };
    res.json(updatedVente);
};

export const deleteVente = async (req: Request, res: Response) => {
    const [result] = await pool.query('DELETE FROM ventes WHERE id = ?', [req.params.id]);
    if (!result) {
        return res.status(404).send('Vente not found');
    }
    res.status(204).send();
};
