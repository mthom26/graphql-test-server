const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const testData = [
  { name: 'Task 1', id: '01' },
  { name: 'Task 2', id: '02' },
  { name: 'Task 3', id: '03' }
];

const testDataMembers = [
  { name: 'John Doe', title: 'Project Lead', id: 'tm01' },
  { name: 'Jane Doe', title: 'Lead Developer', id: 'tm02' },
  { name: 'John Doe Jr.', title: 'UI/UX Lead', id: 'tm03' }
];

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const TeamMemberType = new GraphQLObjectType({
  name: 'TeamMember',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        // get data from database here

        // filter returns array, so extract item from it, to return list use GraphQLList
        return testData.filter( d => d.id == args.id)[0];
      }
    },
    teamMember: {
      type: TeamMemberType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return testDataMembers.filter( member => member.id == args.id)[0];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});