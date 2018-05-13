const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphQLSchema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: graphQLSchema,
  graphiql: true
}));

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});