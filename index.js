const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  # ! nunca pode ser nulo
  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  # Produto
  type Produto {
    id: ID!
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  # Pontos de entrada da API
  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario # tipo definido acima
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]! # [*] indica que é um array
  }
`;

const resolvers = {
  Usuario: {
    // Resolvendo o nome do atributo, poderia ser mapper etc...
    salario(usuario) {
      return usuario.salario_real;
    }
  },
  Produto: {
    precoComDesconto(produto) {
      return produto.preco - produto.preco * produto.desconto;
    }
  },
  Query: {
    ola() {
      return "Olá Apollo/GraphQL";
    },
    horaAtual() {
      return new Date();
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "Mel",
        email: "mel@mel.com",
        idade: 10,
        salario_real: 20000.0,
        vip: true
      };
    },
    produtoEmDestaque() {
      return {
        id: 1,
        nome: "Macbook Pro 16",
        preco: 12000.0,
        desconto: 0.15,
        preco_com_desconto: 12000.0
      };
    },
    numerosMegaSena() {
      //return [4, 3, 18, 43, 56, 62];
      const crescente = (a, b) => a - b;
      return Array(6)
        .fill(0)
        .map(() => parseInt(Math.random() * 60 + 1))
        .sort(crescente);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Default port 4000
server.listen(3000).then(({ url }) => {
  console.log(`Executando em ${url}`);
});

/*
GraphQL

1 - Tipos básicos / Scalar
Int
Float
String
Boolean
ID

Ou Criamos um Scalar ou Criamos um novo tipo personalizado
*/
