const graphql = require('graphql');
const Task = require('../models/task');
const TeamMember = require('../models/member');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = graphql;
/*
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
*/
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
        return Task.findById(args.id, (err, task) => {
          if(err) {
            console.log(err);
          }
        });
        // filter returns array, so extract item from it, to return list use GraphQLList
        //return testData.filter( d => d.id == args.id)[0];
      }
    },
    teamMember: {
      type: TeamMemberType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return TeamMember.findById(args.id);
        //return testDataMembers.filter( member => member.id == args.id)[0];
      }
    },
    allTasks: {
      type: new GraphQLList(TaskType),
      resolve (parent, args) {
        return Task.find();
        //return testData;
      }
    },
    allTeamMembers: {
      type: new GraphQLList(TeamMemberType),
      resolve (parent, args) {
        return TeamMember.find();
        //return testDataMembers;
      }
    }

  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    addTask: {
      type: TaskType,
      args: { name: { type: GraphQLString }},
      resolve(parent, args) {
        let task = new Task({
          name: args.name
        });
        return task.save()
      }
    },
    addTeamMember: {
      type: TeamMemberType,
      args: { name: { type: GraphQLString}, title: { type: GraphQLString }},
      resolve(parent, args) {
        let teamMember = new TeamMember({
          name: args.name,
          title: args.title
        });
        return teamMember.save()
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});