/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { CoursesDataType, coursesData } from '../../data/graphi'

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

// root
// APIエンドポイントごとにリゾルバ関数を提供します
// 特定のフィールドのデータを返すメソッドであり、実際のデータ操作を行う
const root = {
  course: getCourse,
  courses: getCourses,
}
// Create an express server and a GraphQL endpoint
const app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000, () =>
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
)
