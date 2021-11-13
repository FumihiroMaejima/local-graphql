/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express } from 'express'
import { ApolloServer, gql, ExpressContext } from 'apollo-server-express'

let server: ApolloServer<ExpressContext>
let app: Express

// GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

/**
 * start apollo server.
 * @param {}
 * @return {Promise<void>}
 */
const startServe = async (): Promise<void> => {
  // create Apollo server
  server = new ApolloServer({ typeDefs, resolvers })

  // Create an express server and a GraphQL endpoint
  // const app = express()
  app = express()
  // Apollo server Start!
  await server.start()

  server.applyMiddleware({ app })

  app.listen(4000, () =>
    console.log(
      `Express Apollo GraphQL Server Now Running On localhost:4000${server.graphqlPath}`
    )
  )
}

startServe()
