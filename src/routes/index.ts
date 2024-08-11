// src/routes/productRoutes.ts
import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController';
import { createSociete, deleteSociete, getSocieteById, getSocietes, updateSociete } from '../controllers/societeController';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';
import { createClient, deleteClient, getClientById, getClients, updateClient } from '../controllers/clientsController';
import { createVendeur, deleteVendeur, getVendeurById, getVendeurByPhone, getVendeurs, updateVendeur } from '../controllers/vendeurController';

const router = express.Router();

// routes des produits
router.get('/api/products', getProducts);
router.get('/api/products/:id', getProductById);
router.post('/api/products', createProduct);
router.put('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);

// routes des clients
router.get('/api/clients', getClients);
router.get('/api/client/:id', getClientById);
router.post('/api/client', createClient);
router.put('/api/client/:id', updateClient);
router.delete('/api/client/:id', deleteClient);

// routes des vendeurs
router.get('/api/vendeurs', getVendeurs);
router.get('/api/vendeur/:id', getVendeurById);
router.post('/api/login', getVendeurByPhone);
router.post('/api/vendeur', createVendeur);
router.put('/api/vendeur/:id', updateVendeur);
router.delete('/api/vendeur/:id', deleteVendeur);

router.get('/api/societe', getSocietes);
router.get('/api/societe/:id', getSocieteById);
router.post('/api/societe', createSociete);
router.put('/api/societe/:id', updateSociete);
router.delete('/api/societe/:id', deleteSociete);

router.get('/api/users', getUsers);
router.get('/api/users/:id', getUserById);
router.post('/api/users', createUser);
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);

export default router;
