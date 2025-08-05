import mongoose from 'mongoose';
import Post from '../models/Post.js';
import dotenv from 'dotenv';

dotenv.config();

const samplePosts = [
  {
    title: 'Introdução à Programação com JavaScript',
    content: `A programação é uma habilidade fundamental no mundo digital de hoje. Neste post, vamos explorar os conceitos básicos de JavaScript, uma das linguagens de programação mais populares.

JavaScript é uma linguagem de programação interpretada, orientada a objetos, criada em 1995 por Brendan Eich. Ela é amplamente utilizada para desenvolvimento web, tanto no frontend quanto no backend.

Conceitos Básicos:
1. Variáveis e tipos de dados
2. Estruturas de controle
3. Funções
4. Arrays e objetos

Exemplo prático:
\`\`\`javascript
// Declaração de variável
let nome = "João";
const idade = 25;

// Função simples
function saudacao(nome) {
    return "Olá, " + nome + "!";
}

console.log(saudacao("Maria")); // Output: Olá, Maria!
\`\`\`

Este é apenas o começo da sua jornada na programação. Continue praticando e explorando novos conceitos!`,
    author: 'Prof. Ana Silva',
    tags: ['programação', 'javascript', 'educação', 'tecnologia'],
    isPublished: true
  },
  {
    title: 'Matemática Divertida: Geometria no Cotidiano',
    content: `A geometria está presente em todos os lugares ao nosso redor! Desde as formas dos prédios até os padrões da natureza, a matemática nos ajuda a entender o mundo.

Neste post, vamos explorar como a geometria se manifesta no nosso dia a dia:

1. **Formas Geométricas na Arquitetura**
   - Retângulos nas janelas
   - Círculos nos relógios
   - Triângulos nas estruturas

2. **Padrões da Natureza**
   - Hexágonos nas colmeias
   - Espirais nas conchas
   - Fractais nas folhas

3. **Aplicações Práticas**
   - Cálculo de áreas
   - Medição de volumes
   - Projeções espaciais

Exemplo prático:
Para calcular a área de um círculo: A = π × r²
Onde π (pi) ≈ 3,14159 e r é o raio.

A geometria não é apenas números e fórmulas - é uma forma de ver o mundo com olhos matemáticos!`,
    author: 'Prof. Carlos Mendes',
    tags: ['matemática', 'geometria', 'educação', 'cotidiano'],
    isPublished: true
  },
  {
    title: 'Ciências: O Ciclo da Água',
    content: `A água é essencial para a vida na Terra. Neste post, vamos entender como funciona o ciclo da água e sua importância para o nosso planeta.

O ciclo da água, também conhecido como ciclo hidrológico, é o processo contínuo de circulação da água na Terra. Ele envolve várias etapas:

**Etapas do Ciclo:**
1. **Evaporação**: A água dos oceanos, rios e lagos evapora com o calor do sol
2. **Condensação**: O vapor d'água se condensa formando nuvens
3. **Precipitação**: A água cai como chuva, neve ou granizo
4. **Infiltração**: Parte da água se infiltra no solo
5. **Escoamento**: A água flui de volta para rios e oceanos

**Importância:**
- Mantém o equilíbrio climático
- Distribui nutrientes pelo planeta
- Sustenta ecossistemas aquáticos
- Fornece água potável

**Curiosidade:**
A água que bebemos hoje é a mesma que existia há milhões de anos! O ciclo da água recicla constantemente este recurso vital.`,
    author: 'Prof. Maria Santos',
    tags: ['ciências', 'água', 'meio ambiente', 'educação'],
    isPublished: true
  },
  {
    title: 'História: A Revolução Industrial',
    content: `A Revolução Industrial foi um período de grandes transformações que mudou para sempre a forma como vivemos e trabalhamos. Vamos explorar este momento histórico fundamental.

**Contexto Histórico:**
A Revolução Industrial começou na Inglaterra no final do século XVIII e se espalhou pelo mundo nos séculos seguintes.

**Principais Invenções:**
1. **Máquina a Vapor** (James Watt, 1769)
2. **Tear Mecânico** (Edmund Cartwright, 1785)
3. **Locomotiva** (George Stephenson, 1814)
4. **Telégrafo** (Samuel Morse, 1837)

**Impactos Sociais:**
- Urbanização acelerada
- Surgimento da classe operária
- Mudanças nas relações de trabalho
- Avanços tecnológicos

**Legado:**
A Revolução Industrial estabeleceu as bases do mundo moderno, influenciando:
- Sistemas de produção
- Organização social
- Desenvolvimento tecnológico
- Globalização

Este período histórico nos ensina como a inovação pode transformar completamente uma sociedade.`,
    author: 'Prof. Roberto Lima',
    tags: ['história', 'revolução industrial', 'educação', 'tecnologia'],
    isPublished: true
  },
  {
    title: 'Literatura: O Poder da Narrativa',
    content: `A literatura é uma das formas mais poderosas de expressão humana. Através das histórias, podemos explorar emoções, culturas e realidades diferentes da nossa.

**Gêneros Literários:**
1. **Romance**: Narrativas longas com personagens complexos
2. **Conto**: Histórias curtas e impactantes
3. **Poesia**: Expressão artística através de versos
4. **Teatro**: Literatura destinada à representação

**Elementos da Narrativa:**
- **Personagens**: Quem conta a história
- **Enredo**: O que acontece na história
- **Tempo**: Quando a história acontece
- **Espaço**: Onde a história acontece
- **Narrador**: Quem conta a história

**Exemplo de Análise:**
No conto "A Hora da Estrela" de Clarice Lispector, a autora explora temas como:
- Identidade
- Solidão
- Existência humana
- Condição feminina

A literatura nos permite viver milhares de vidas através das páginas de um livro.`,
    author: 'Prof. Fernanda Costa',
    tags: ['literatura', 'narrativa', 'educação', 'arte'],
    isPublished: true
  }
];

const seedDatabase = async () => {
  try {
    // Conectar ao banco
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fiap-blogging-api';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📦 Conectado ao MongoDB');

    // Limpar posts existentes
    await Post.deleteMany({});
    console.log('🧹 Posts anteriores removidos');

    // Inserir posts de exemplo
    const createdPosts = await Post.insertMany(samplePosts);
    console.log(`✅ ${createdPosts.length} posts criados com sucesso`);

    // Mostrar estatísticas
    const totalPosts = await Post.countDocuments();
    const publishedPosts = await Post.countDocuments({ isPublished: true });
    
    console.log('\n📊 Estatísticas:');
    console.log(`- Total de posts: ${totalPosts}`);
    console.log(`- Posts publicados: ${publishedPosts}`);
    console.log(`- Posts rascunho: ${totalPosts - publishedPosts}`);

    console.log('\n🎉 Banco de dados populado com sucesso!');
    console.log('🌐 Acesse http://localhost:3000/api/posts para ver os posts');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase; 