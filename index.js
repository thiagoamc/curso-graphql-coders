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

  # Pontos de entrada da API
  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario # tipo definido acima
  }
`;

const resolvers = {
  Usuario: {
    // Resolvendo o nome do atributo, poderia ser mapper etc...
    salario(usuario) {
      return usuario.salario_real;
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
