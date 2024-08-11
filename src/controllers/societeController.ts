// src/controllers/societeController.ts
import { Request, Response } from 'express';
import pool from '../utils/dbConfig';
import { Societe } from '../models/societe';

export const getSocietes = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM societes');
    const societes: Societe[] = rows as Societe[];
    res.json(societes);
};

export const getSocieteById = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM societes WHERE id = ?', [req.params.id]);
    const societes: Societe[] = rows as Societe[];
    if (societes.length === 0) {
        return res.status(404).send('Societe not found');
    }
    res.json(societes[0]);
};

export const createSociete = async (req: Request, res: Response) => {
    const { nom, nifStat } = req.body;
    const [result] = await pool.query('INSERT INTO societes (nom,adresse, ville, tel, nif, Stat) VALUES (?, ?)', [nom, nifStat]);
    res.status(201).json(result);
};

export const updateSociete = async (req: Request, res: Response) => {
    const { nom, nifStat } = req.body;
    const [result] = await pool.query('UPDATE societes SET nom = ?, nifStat = ? WHERE id = ?', [nom, nifStat, req.params.id]);
    if (!result) {
        return res.status(404).send('Societe not found');
    }
    const updatedSociete: Societe = { id: parseInt(req.params.id), nom, nifStat };
    res.json(updatedSociete);
};

export const deleteSociete = async (req: Request, res: Response) => {
    const [result] = await pool.query('DELETE FROM societes WHERE id = ?', [req.params.id]);
    if (!result) {
        return res.status(404).send('Societe not found');
    }
    res.status(204).send();
};
