import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

import posts from './posts'
import { resolve } from 'url'

let allPosts = [...posts]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
  },
})

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: GraphQLString },
    text: { type: GraphQLString },
    owner: { type: UserType },
  },
})
const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, args) {
        return []
      },
    },
    owner: {
      type: UserType,
      resolve(parentValue, args) {
        return null
      },
    },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        const { id } = args
        return allPosts.find(post => post.id === id)
      },
    },
  },
})

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        const { title, text } = args
        const post = { id: allPosts.length + '', title, text }
        allPosts.push(post)
        return post
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
})

export default schema
