import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import Post from '../models/Post.js';

// Mock do banco de dados para testes
beforeAll(async () => {
  // Desconectar se já estiver conectado
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  const mongoURI = 'mongodb://127.0.0.1:27017/fiap-blogging-api-test';
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  await Post.deleteMany({});
});

describe('Post Controller Tests', () => {
  describe('GET /api/posts', () => {
    it('should return all published posts', async () => {
      // Criar posts de teste
      const testPosts = [
        {
          title: 'Test Post 1',
          content: 'This is test content for post 1',
          author: 'Test Author 1',
          isPublished: true,
        },
        {
          title: 'Test Post 2',
          content: 'This is test content for post 2',
          author: 'Test Author 2',
          isPublished: true,
        },
        {
          title: 'Draft Post',
          content: 'This is a draft post',
          author: 'Test Author 3',
          isPublished: false,
        },
      ];

      await Post.insertMany(testPosts);

      const response = await request(app).get('/api/posts').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.posts).toHaveLength(2);

      const postTitles = response.body.data.posts.map(post => post.title);
      expect(postTitles).toContain('Test Post 2');
      expect(postTitles).toContain('Test Post 1');
    });

    it('should handle pagination correctly', async () => {
      // Criar 15 posts de teste
      const testPosts = Array.from({ length: 15 }, (_, i) => ({
        title: `Test Post ${i + 1}`,
        content: `This is test content for post ${i + 1}`,
        author: `Test Author ${i + 1}`,
        isPublished: true,
      }));

      await Post.insertMany(testPosts);

      const response = await request(app)
        .get('/api/posts?page=1&limit=5')
        .expect(200);

      expect(response.body.data.posts).toHaveLength(5);
      expect(response.body.data.totalPosts).toBe(15);
      expect(response.body.data.totalPages).toBe(3);
    });
  });

  describe('GET /api/posts/:id', () => {
    it('should return a specific post by ID', async () => {
      const testPost = new Post({
        title: 'Test Post',
        content: 'This is test content',
        author: 'Test Author',
        isPublished: true,
      });

      const savedPost = await testPost.save();

      const response = await request(app)
        .get(`/api/posts/${savedPost._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Test Post');
      expect(response.body.data.content).toBe('This is test content');
    });

    it('should return 404 for non-existent post', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .get(`/api/posts/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Post não encontrado');
    });

    it('should return 403 for unpublished post', async () => {
      const testPost = new Post({
        title: 'Draft Post',
        content: 'This is a draft post',
        author: 'Test Author',
        isPublished: false,
      });

      const savedPost = await testPost.save();

      const response = await request(app)
        .get(`/api/posts/${savedPost._id}`)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Post não está publicado');
    });
  });

  describe('POST /api/posts', () => {
    it('should create a new post successfully', async () => {
      const postData = {
        title: 'New Test Post',
        content: 'This is new test content',
        author: 'New Test Author',
        tags: ['test', 'education'],
      };

      const response = await request(app)
        .post('/api/posts')
        .send(postData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('New Test Post');
      expect(response.body.data.author).toBe('New Test Author');
      expect(response.body.data.tags).toEqual(['test', 'education']);
      expect(response.body.data.isPublished).toBe(true);
    });

    it('should return 400 for missing required fields', async () => {
      const postData = {
        title: 'Incomplete Post',
        // Missing content and author
      };

      const response = await request(app)
        .post('/api/posts')
        .send(postData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Dados inválidos');
    });

    it('should return 400 for invalid data', async () => {
      const postData = {
        title: 'A', // Too short
        content: 'Short', // Too short
        author: 'A', // Too short
      };

      const response = await request(app)
        .post('/api/posts')
        .send(postData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('should update a post successfully', async () => {
      const testPost = new Post({
        title: 'Original Title',
        content: 'Original content',
        author: 'Original Author',
        isPublished: true,
      });

      const savedPost = await testPost.save();

      const updateData = {
        title: 'Updated Title',
        content: 'Updated content',
        author: 'Updated Author',
      };

      const response = await request(app)
        .put(`/api/posts/${savedPost._id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Updated Title');
      expect(response.body.data.content).toBe('Updated content');
      expect(response.body.data.author).toBe('Updated Author');
    });

    it('should return 404 for non-existent post', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .put(`/api/posts/${fakeId}`)
        .send({ title: 'Updated Title' })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Post não encontrado');
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('should delete a post successfully', async () => {
      const testPost = new Post({
        title: 'Post to Delete',
        content: 'This post will be deleted',
        author: 'Test Author',
        isPublished: true,
      });

      const savedPost = await testPost.save();

      const response = await request(app)
        .delete(`/api/posts/${savedPost._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Post excluído com sucesso');

      // Verify post was actually deleted
      const deletedPost = await Post.findById(savedPost._id);
      expect(deletedPost).toBeNull();
    });

    it('should return 404 for non-existent post', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .delete(`/api/posts/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Post não encontrado');
    });
  });

  describe('GET /api/posts/search', () => {
    it('should search posts by keyword', async () => {
      const testPosts = [
        {
          title: 'JavaScript Tutorial',
          content: 'Learn JavaScript programming',
          author: 'Tech Teacher',
          isPublished: true,
          tags: ['javascript', 'programming'],
        },
        {
          title: 'Math Basics',
          content: 'Basic mathematics concepts',
          author: 'Math Teacher',
          isPublished: true,
          tags: ['math', 'education'],
        },
        {
          title: 'Science Experiments',
          content: 'Fun science experiments for students',
          author: 'Science Teacher',
          isPublished: true,
          tags: ['science', 'experiments'],
        },
      ];

      await Post.insertMany(testPosts);

      const response = await request(app)
        .get('/api/posts/search?q=javascript')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.searchTerm).toBe('javascript');
      expect(response.body.data.posts).toHaveLength(1);
      expect(response.body.data.posts[0].title).toBe('JavaScript Tutorial');
    });

    it('should return 400 for search term too short', async () => {
      const response = await request(app)
        .get('/api/posts/search?q=a')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Dados inválidos');
    });
  });
});
