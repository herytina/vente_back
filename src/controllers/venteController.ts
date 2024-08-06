// src/controllers/venteController.ts
import { Request, Response } from 'express';
import pool from '../dbConfig';
import { Vente } from '../models/vente';

// Helper function to convert JSON array to SQL array
const convertToSqlArray = (arr: number[]): string => {
    return JSON.stringify(arr);
};

export const getVentes = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM ventes');
    const ventes: Vente[] = rows.map((row: any) => ({
        ...row,
        idProdEn: JSON.parse(row.idProdEn)
    }));
    res.json(ventes);
};

export const getVenteById = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM ventes WHERE id = ?', [req.params.id]);
    const ventes: Vente[] = rows.map((row: any) => ({
        ...row,
        idProdEn: JSON.parse(row.idProdEn)
    }));
    if (ventes.length === 0) {
        return res.status(404).send('Vente not found');
    }
    res.json(ventes[0]);
};

export const createVente = async (req: Request, res: Response) => {
    const { idCli, idProdEn, idSociete } = req.body;
    const idProdEnStr = convertToSqlArray(idProdEn);
    const [result] = await pool.query('INSERT INTO ventes (idCli, idProdEn, idSociete) VALUES (?, ?, ?)', [idCli, idProdEnStr, idSociete]);
    const newVente: Vente = { id: (result as any).insertId, idCli, idProdEn, idSociete };
    res.status(201).json(newVente);
};

export const updateVente = async (req: Request, res: Response) => {
    const { idCli, idProdEn, idSociete } = req.body;
    const idProdEnStr = convertToSqlArray(idProdEn);
    const [result] = await pool.query('UPDATE ventes SET idCli = ?, idProdEn = ?, idSociete = ? WHERE id = ?', [idCli, idProdEnStr, idSociete, req.params.id]);
    if ((result as any).affectedRows === 0) {
        return res.status(404).send('Vente not found');
    }
    const updatedVente: Vente = { id: parseInt(req.params.id), idCli, idProdEn, idSociete };
    res.json(updatedVente);
};

export const deleteVente = async (req: Request, res: Response) => {
    const [result] = await pool.query('DELETE FROM ventes WHERE id = ?', [req.params.id]);
    if ((result as any).affectedRows === 0) {
        return res.status(404).send('Vente not found');
    }
    res.status(204).send();
};
