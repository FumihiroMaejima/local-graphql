import {
  checkPerformance,
  sortArrayNumbers,
  sortArrayNumbersDesc,
} from '@/util/index'

const testData = [{ param: [5, 3, 9, 1, 10], expect: [1, 3, 5, 9, 10] }]

describe('sortArrayNumbers', () => {
  it('sortArrayNumbers test', () => {
    testData.forEach((v) => {
      expect(sortArrayNumbers(v.param)).toEqual(v.expect)
    })
  })
})

const testDataDesc = [{ param: [5, 3, 9, 1, 10], expect: [10, 9, 5, 3, 1] }]

describe('sortArrayNumbersDesc', () => {
  it('sortArrayNumbersDesc test', () => {
    testDataDesc.forEach((v) => {
      expect(sortArrayNumbersDesc(v.param)).toEqual(v.expect)
    })
  })
})

describe('sortArrayNumbers check performance', () => {
  it('sortArrayNumbers performance check', () => {
    const data = [5, 3, 9, 1, 10]

    expect(checkPerformance('sortArrayNumbers', sortArrayNumbers(data))).toBe(
      undefined
    )
  })
})
