import { Request, Response } from 'express';
import pool from '../utils/dbConfig';
import { Vendeur } from '../models/vendeurs';
import { comparePassword, hashPassword } from '../utils/auth';

export const getVendeurs = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM vendeurs');
    res.json(rows);
};

export const getVendeurById = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM vendeurs WHERE id = ?', [req.params.id]);
    const vendeurs: Vendeur[] = rows as Vendeur[];
    if (vendeurs.length === 0) {
        return res.status(404).send('vendeur not found');
    }
    res.json(vendeurs[0]);
};

export const getVendeurByPhone = async (req: Request, res: Response) => {
    const { tel, pwd} = req.body;
    const [rows] = await pool.query('SELECT * FROM vendeurs WHERE tel = ?', [tel]);
    const vendeurs: Vendeur[] = rows as Vendeur[];
    if (Array.isArray(rows) && rows.length > 0) {
        const hashedPassword = vendeurs[0].pwd as string;
        if(await comparePassword(pwd, hashedPassword)){
            res.json(vendeurs[0]);
        }else{
            res.status(404).json('mots de passe incorrecte');;
        }
      }else {
        return res.status(404).send('vendeur not found');
    }
};

export const createVendeur = async (req: Request, res: Response) => {
    const { nom, prenom, tel, secteur, societe, pwd } = req.body;
    const hashedPassword = await hashPassword(pwd || '0000');
    const [result] = await pool.query('INSERT INTO vendeurs (nom, prenom, tel, secteur, societe, pwd) VALUES (?, ?, ?, ?, ?, ?)', [nom, prenom, tel, secteur, societe, hashedPassword]);
    res.status(201).json(result);
};

export const updateVendeur = async (req: Request, res: Response) => {
    const { nom, prenom, tel, secteur, societe  } = req.body;
    const result = await pool.query('UPDATE vendeurs SET nom = ?, prenom = ?, tel = ?, secteur = ?, societe = ? WHERE id = ?', [nom, prenom, tel, secteur, societe , req.params.id]);
    if (!result) {
        return res.status(404).send('vendeur not found');
    }
    res.json({ id: req.params.id, nom, prenom, tel, secteur, societe  });
};

export const deleteVendeur = async (req: Request, res: Response) => {
    const result = await pool.query('DELETE FROM vendeurs WHERE id = ?', [req.params.id]);
    res.status(204).send(result);
};
