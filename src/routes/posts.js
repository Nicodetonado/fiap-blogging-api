import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  getAllPostsAdmin
} from '../controllers/postController.js';

const router = express.Router();

// Middleware de validação
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }
  next();
};

// Validações
const createPostValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Conteúdo deve ter pelo menos 10 caracteres'),
  body('author')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Autor deve ter entre 2 e 100 caracteres'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags deve ser um array'),
  validateRequest
];

const updatePostValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID inválido'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Título deve ter entre 3 e 200 caracteres'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Conteúdo deve ter pelo menos 10 caracteres'),
  body('author')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Autor deve ter entre 2 e 100 caracteres'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags deve ser um array'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished deve ser um booleano'),
  validateRequest
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID inválido'),
  validateRequest
];

const searchValidation = [
  query('q')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Termo de busca deve ter pelo menos 2 caracteres'),
  validateRequest
];

// Rotas públicas (para alunos)
// GET /posts - Lista de Posts
router.get('/', getAllPosts);

// GET /posts/:id - Leitura de Posts específicos
router.get('/:id', idValidation, getPostById);

// GET /posts/search - Busca de Posts
router.get('/search', searchValidation, searchPosts);

// Rotas administrativas (para professores)
// POST /posts - Criação de Postagens
router.post('/', createPostValidation, createPost);

// PUT /posts/:id - Edição de Postagens
router.put('/:id', updatePostValidation, updatePost);

// DELETE /posts/:id - Exclusão de Postagens
router.delete('/:id', idValidation, deletePost);

// GET /posts/admin - Listagem de Todas as Postagens (para professores)
router.get('/admin/all', getAllPostsAdmin);

export default router; 