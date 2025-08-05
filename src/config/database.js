import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fiap-blogging-api';

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (process.env.NODE_ENV !== 'test') {
      console.log(`📦 MongoDB conectado: ${conn.connection.host}`);
    }

    mongoose.set('debug', process.env.NODE_ENV === 'development');
  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB:', error.message);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;
