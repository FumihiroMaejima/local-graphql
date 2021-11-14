/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express } from 'express'
import {
  ApolloServer,
  gql,
  ApolloServerExpressConfig,
} from 'apollo-server-express'
import { usersData, UserType } from '../../data/apollo'

// GraphQL schema
const typeDefs = gql`
  type User {
    id: Int
    name: String
    age: Int
    created_at: String
  }

  type Query {
    users(limit: Int): [User]
  }
`

/**
 * get users data resolver
 * @param {undefined | unknown} parent
 * @param {{ limit: number }} args
 * @return {UserType[]}
 */
const userResolver = (
  parent: undefined | unknown,
  args: { limit: number }
): UserType[] => {
  let result = usersData
  const limit = args.limit || 0

  console.log('parent: ' + JSON.stringify(parent, null, 2))
  console.log('test: ' + JSON.stringify(args, null, 2))

  if (limit > 0) {
    result = result.slice(0, limit)
  }

  return result
}

// resolver functions for schema fields
const resolvers = {
  Query: {
    // users: () => usersData,
    users: userResolver,
  },
}

/**
 * start apollo server & express applictaion.
 * @param {}
 * @return {Promise<void>}
 */
const startServer = async (): Promise<void> => {
  // create Apollo server
  const server: ApolloServer<ApolloServerExpressConfig> = new ApolloServer({
    typeDefs,
    resolvers,
  })

  // Create express application
  const app: Express = express()

  // Start Apollo Server
  await server.start()

  // apply express to apollo as middleware
  server.applyMiddleware({ app })

  // listen for http connection
  app.listen(4000, () =>
    console.log(
      `Express Apollo GraphQL Server Now Running On localhost:4000${server.graphqlPath} \n Check sandbox.`
    )
  )
}

// main method
startServer()

/**
 * sample query1
 */
/*
{
  users(limit: 1) {
    id
    name
    # created_at
  }
}
*/

/**
 * sample response1
 */
/*
{
  "data": {
    "users": [
      {
        "id": 1,
        "name": "Test1"
      }
    ]
  }
}
*/


/**
 * sample query2
 */
/*
query userQuery($limit: Int!) {
  users(limit: $limit) {
    id
    name
  }
}
*/

/**
 * sample variables of sample query2
 * @return {json}
 */
/*
{
  "limit": 2
}
*/

/**
 * sample response2
 */
/*
{
  "data": {
    "users": [
      {
        "id": 1,
        "name": "Test1"
      },
      {
        "id": 2,
        "name": "Test2"
      }
    ]
  }
}
*/

