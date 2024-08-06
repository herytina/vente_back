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

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.get('/', getSocietes);
router.get('/:id', getSocieteById);
router.post('/', createSociete);
router.put('/:id', updateSociete);
router.delete('/:id', deleteSociete);

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
