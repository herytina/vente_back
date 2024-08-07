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

const router = express.Router();

router.get('/api/products', getProducts);
router.get('/api/products/:id', getProductById);
router.post('/api/products', createProduct);
router.put('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);

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
