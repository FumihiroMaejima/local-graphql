/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import { OptionsData, graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

// GraphQL schema
const schema = buildSchema(`
  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  },
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  },
`)

type CoursesDataType = {
  id: number
  title: string
  author: string
  description: string
  topic: string
  url: string
}

const coursesData: CoursesDataType[] = [
  {
    id: 1,
    title: 'Test1',
    author: 'Test Name1',
    description: 'test description1.',
    topic: 'Test Topic1',
    url: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: 2,
    title: 'Test2',
    author: 'Test Name2',
    description: 'test description2, test12345!',
    topic: 'Test Topic2',
    url: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: 3,
    title: 'Test3',
    author: 'Test Name3',
    description: 'test description3, test12345, abcdefg!.',
    topic: 'Test Topic3',
    url: 'https://picsum.photos/id/237/200/300',
  },
]

/**
 * get single course data.
 * @param {CoursesDataType} course
 * @return {CoursesDataType}
 */
const getCourse = (course: CoursesDataType) => {
  return coursesData.filter((v) => {
    return v.id == course.id
  })[0]
}

/**
 * get course data collection.
 * @param {CoursesDataType} course
 * @return {CoursesDataType}
 */
const getCourses = (course: CoursesDataType) => {
  if (course.topic) {
    return coursesData.filter((v) => v.topic === course.topic)
  } else {
    return coursesData
  }
}

// resolver
const resolver = {
  course: getCourse,
  courses: getCourses,
}
// Create an express server and a GraphQL endpoint
const app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
)
app.listen(4000, () =>
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
)
