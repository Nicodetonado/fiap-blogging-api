import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    maxlength: [200, 'Título não pode ter mais de 200 caracteres'],
    minlength: [3, 'Título deve ter pelo menos 3 caracteres']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório'],
    trim: true,
    minlength: [10, 'Conteúdo deve ter pelo menos 10 caracteres']
  },
  author: {
    type: String,
    required: [true, 'Autor é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome do autor não pode ter mais de 100 caracteres']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  readTime: {
    type: Number,
    default() {
      const wordCount = this.content ? this.content.split(/\s+/).length : 0;
      return Math.ceil(wordCount / 200);
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1 });

postSchema.virtual('slug').get(function() {
  return this.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
});

postSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  next();
});

postSchema.statics.searchPosts = function(searchTerm) {
  return this.find({
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
  }).sort({ createdAt: -1 });
};

postSchema.methods.getExcerpt = function(length = 150) {
  return this.content.length > length 
    ? `${this.content.substring(0, length)  }...`
    : this.content;
};

postSchema.plugin(mongoosePaginate);

export default mongoose.model('Post', postSchema); 