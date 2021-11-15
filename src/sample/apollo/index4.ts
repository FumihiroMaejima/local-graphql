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
    users(limit: Int, ageSort: String): [User]
  }
`
/**
 * get users data resolver
 * @param {undefined | unknown} parent
 * @param {{ limit: number, ageSort?: 'desc' | 'asc' }} args
 * @return {UserType[]}
 */
const userResolver = (
  parent: undefined | unknown,
  args: { limit: number; ageSort?: 'asc' | 'desc' }
): UserType[] => {
  let result = usersData
  const limit = args.limit || 0
  const isSort = args.ageSort || undefined

  console.log('parent: ' + JSON.stringify(parent, null, 2))
  console.log('test: ' + JSON.stringify(args, null, 2))

  if (isSort) {
    const operation = isSort === 'asc' ? 1 : -1
    const sortKey = 'age'

    result = usersData.sort((current, next) => {
      if (current[sortKey] > next[sortKey]) return operation
      if (current[sortKey] < next[sortKey]) return -operation
      return 0
    })
  }

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
  users(limit: 2, ageSort: "desc") {
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
        "id": 5,
        "name": "Test5"
      },
      {
        "id": 4,
        "name": "Test4"
      }
    ]
  }
}
*/

/**
 * sample query2
 */
/*
query userQueryLimitSort($limit: Int!, $ageSort: String) {
  users(limit: $limit, ageSort: $ageSort) {
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
  "limit": 3,
  "ageSort": "desc"
}
*/

/**
 * sample response2
 */
/*
{
  "data": {
    "users": [
    "users": [
      {
        "id": 5,
        "name": "Test5"
      },
      {
        "id": 4,
        "name": "Test4"
      },
      {
        "id": 3,
        "name": "Test3"
      }
    ]
  }
}
*/
