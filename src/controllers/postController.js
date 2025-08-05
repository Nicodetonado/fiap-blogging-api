import Post from '../models/Post.js';

// GET /posts - Lista de Posts (para alunos)
const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort,
      customLabels: {
        docs: 'posts',
        totalDocs: 'totalPosts',
        totalPages: 'totalPages',
        hasNextPage: 'hasNextPage',
        hasPrevPage: 'hasPrevPage'
      }
    };

    const posts = await Post.paginate(
      { isPublished: true },
      options
    );

    res.status(200).json({
      success: true,
      message: 'Posts recuperados com sucesso',
      data: posts
    });
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// GET /posts/search - Busca de Posts
const searchPosts = async (req, res) => {
  try {
    const { q: searchTerm, page = 1, limit = 10 } = req.query;

    if (!searchTerm || searchTerm.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Termo de busca deve ter pelo menos 2 caracteres'
      });
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: '-createdAt',
      customLabels: {
        docs: 'posts',
        totalDocs: 'totalPosts',
        totalPages: 'totalPages',
        hasNextPage: 'hasNextPage',
        hasPrevPage: 'hasPrevPage'
      }
    };

    const searchResults = await Post.paginate(
      {
        $and: [
          { isPublished: true },
          {
            $or: [
              { title: { $regex: searchTerm, $options: 'i' } },
              { content: { $regex: searchTerm, $options: 'i' } },
              { tags: { $in: [new RegExp(searchTerm, 'i')] } }
            ]
          }
        ]
      },
      options
    );

    res.status(200).json({
      success: true,
      message: 'Busca realizada com sucesso',
      searchTerm,
      data: searchResults
    });
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// GET /posts/:id - Leitura de Posts específicos
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    if (!post.isPublished) {
      return res.status(403).json({
        success: false,
        message: 'Post não está publicado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post recuperado com sucesso',
      data: post
    });
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// POST /posts - Criação de Postagens (para professores)
const createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    // Validações básicas
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: 'Título, conteúdo e autor são obrigatórios'
      });
    }

    const newPost = new Post({
      title,
      content,
      author,
      tags: tags || []
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: 'Post criado com sucesso',
      data: savedPost
    });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// PUT /posts/:id - Edição de Postagens
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, tags, isPublished } = req.body;

    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    // Atualiza apenas os campos fornecidos
    if (title) post.title = title;
    if (content) post.content = content;
    if (author) post.author = author;
    if (tags) post.tags = tags;
    if (typeof isPublished === 'boolean') post.isPublished = isPublished;

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: 'Post atualizado com sucesso',
      data: updatedPost
    });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// DELETE /posts/:id - Exclusão de Postagens
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Post excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export {
  getAllPosts,
  searchPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost  
}; 