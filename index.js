const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  # Pontos de entrada da API
  type Query {
    ola: String
    horaAtual: String
  }
`;

const resolvers = {
  Query: {
    ola() {
      return "Olá Apollo/GraphQL";
    },
    horaAtual() {
      return `${new Date()}`;
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
