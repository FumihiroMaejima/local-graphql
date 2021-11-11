export type CoursesDataType = {
  id: number
  title: string
  author: string
  description: string
  topic: string
  url: string
}

export const coursesData: CoursesDataType[] = [
  {
    id: 1,
    title: 'Test1',
    author: 'Test Name1',
    description: 'test description1.',
    topic: 'Topic1',
    url: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: 2,
    title: 'Test2',
    author: 'Test Name2',
    description: 'test description2, test12345!',
    topic: 'Topic2',
    url: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: 3,
    title: 'Test3',
    author: 'Test Name3',
    description: 'test description3, test12345, abcdefg!.',
    topic: 'Topic2',
    url: 'https://picsum.photos/id/237/200/300',
  },
]
