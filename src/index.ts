/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express } from 'express'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { typeDefs, resolvers } from './sample/apollo/index5'

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
