// src/controllers/userController.ts
import { Request, Response } from 'express';
import pool from '../utils/dbConfig';
import { User } from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM users');
    const users: User[] = rows as User[];
    res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    const users: User[] = rows as User[];
    if (users.length === 0) {
        return res.status(404).send('User not found');
    }
    res.json(users[0]);
};

export const createUser = async (req: Request, res: Response) => {
    const { nom, prenom, tel, mail, pwd, idSociete, adresse, type } = req.body;
    const [result] = await pool.query('INSERT INTO users (nom, prenom, tel, mail, pwd, societe, secteur, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nom, prenom, tel, mail, pwd, idSociete, adresse, type]);
    // const newUser: User = { id: (result as any).insertId, nom, prenom, tel, mail, pwd, idSociete, adresse, type };
    res.status(201).json(result);
};

export const updateUser = async (req: Request, res: Response) => {
    const { nom, prenom, tel, mail, pwd, idSociete, adresse, type } = req.body;
    const [result] = await pool.query('UPDATE users SET nom = ?, prenom = ?, tel = ?, mail = ?, pwd = ?, idSociete = ?, adresse = ?, type = ? WHERE id = ?', [nom, prenom, tel, mail, pwd, idSociete, adresse, type, req.params.id]);
    if (!result) {
        return res.status(404).send('User not found');
    }
    const updatedUser: User = { id: parseInt(req.params.id), nom, prenom, tel, mail, pwd, idSociete, adresse, type };
    res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (!result) {
        return res.status(404).send('User not found');
    }
    res.status(204).send();
};
