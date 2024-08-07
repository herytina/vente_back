// src/controllers/societeController.ts
import { Request, Response } from 'express';
import pool from '../dbConfig';
import { Clients } from '../models/clients';

export const getClients = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM clients');
    const clients: Clients[] = rows as Clients[];
    res.json(clients);
};

export const getClientById = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM clients WHERE id = ?', [req.params.id]);
    const clients: Clients[] = rows as Clients[];
    if (clients.length === 0) {
        return res.status(404).send('client not found');
    }
    res.json(clients[0]);
};

export const createClient = async (req: Request, res: Response) => {
    const { nom, prenom, tel, adresse, nifStat } = req.body;
    const [result] = await pool.query('INSERT INTO clients (nom, prenom, tel, adresse, nifStat) VALUES (?, ?, ?, ?, ?)', [nom, prenom, tel, adresse, nifStat]);
    res.status(201).json(result);
};

export const updateClient = async (req: Request, res: Response) => {
    const { nom } = req.body;
    const [result] = await pool.query('UPDATE clients SET nom = ? WHERE id = ?', [nom, req.params.id]);
    if (!result) {
        return res.status(404).send('Clients not found');
    }
    const updatedClients = { id: parseInt(req.params.id), nom };
    res.json(updatedClients);
};

export const deleteClient = async (req: Request, res: Response) => {
    const [result] = await pool.query('DELETE FROM clients WHERE id = ?', [req.params.id]);
    if (!result) {
        return res.status(404).send('Client not found');
    }
    res.status(204).send();
};
