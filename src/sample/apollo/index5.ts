/* eslint-disable @typescript-eslint/no-var-requires */
import { gql } from 'apollo-server-express'
import { usersData, UserType } from '../../data/apollo'

// GraphQL schema
export const typeDefs = gql`
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
export const userResolver = (
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
export const resolvers = {
  Query: {
    // users: () => usersData,
    users: userResolver,
  },
}

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
