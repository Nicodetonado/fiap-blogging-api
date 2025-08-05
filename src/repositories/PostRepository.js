import Post from '../models/Post.js';

class PostRepository {
  // Buscar todos os posts publicados
  static async findPublished(options = {}) {
    return await Post.paginate({ isPublished: true }, options);
  }

  // Buscar post por ID
  static async findById(id) {
    return await Post.findById(id);
  }

  // Buscar posts por termo de busca
  static async search(searchTerm, options = {}) {
    return await Post.paginate(
      {
        $and: [
          { isPublished: true },
          {
            $or: [
              { title: { $regex: searchTerm, $options: 'i' } },
              { content: { $regex: searchTerm, $options: 'i' } },
              { tags: { $in: [new RegExp(searchTerm, 'i')] } },
            ],
          },
        ],
      },
      options
    );
  }

  // Criar novo post
  static async create(postData) {
    const newPost = new Post(postData);
    return await newPost.save();
  }

  // Atualizar post
  static async update(id, updateData) {
    const post = await Post.findById(id);
    if (!post) return null;

    // Atualiza apenas os campos fornecidos
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        post[key] = updateData[key];
      }
    });

    return await post.save();
  }

  // Excluir post
  static async delete(id) {
    return await Post.findByIdAndDelete(id);
  }

  // Contar posts publicados
  static async countPublished() {
    return await Post.countDocuments({ isPublished: true });
  }

  // Contar posts rascunho
  static async countDrafts() {
    return await Post.countDocuments({ isPublished: false });
  }

  // Buscar posts por autor
  static async findByAuthor(author, options = {}) {
    return await Post.paginate({ author, isPublished: true }, options);
  }

  // Buscar posts por tags
  static async findByTags(tags, options = {}) {
    return await Post.paginate(
      {
        tags: { $in: tags },
        isPublished: true,
      },
      options
    );
  }
}

export default PostRepository;
