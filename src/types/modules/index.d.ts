/* eslint-disable @typescript-eslint/no-empty-interface */

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}
