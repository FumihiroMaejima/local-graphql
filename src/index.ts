/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express } from 'express'
import {
  ApolloServer,
  gql,
  ApolloServerExpressConfig,
} from 'apollo-server-express'

let server: ApolloServer<ApolloServerExpressConfig>
let app: Express

// GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// resolver functions for schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

/**
 * start apollo server & express applictaion.
 * @param {}
 * @return {Promise<void>}
 */
const startServe = async (): Promise<void> => {
  // create Apollo server
  server = new ApolloServer({ typeDefs, resolvers })

  // Create an express application
  app = express()

  // Start Apollo Server
  await server.start()

  // apply express to apollo as middleware
  server.applyMiddleware({ app })

  // listen for http connection
  app.listen(4000, () =>
    console.log(
      `Express Apollo GraphQL Server Now Running On localhost:4000${server.graphqlPath}`
    )
  )
}

// run method
startServe()
