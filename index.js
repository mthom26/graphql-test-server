const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const graphQLSchema = require('./schema/schema');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost/graphqltest', () => {
  console.log('mongodb connected');
});

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: graphQLSchema,
  graphiql: true
}));

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});