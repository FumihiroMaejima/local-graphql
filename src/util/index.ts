/* eslint-disable @typescript-eslint/no-var-requires */
const { performance } = require('perf_hooks')
// Detail https://qiita.com/hayashi-ay/items/5e26f936a5c4dfbeb645

/**
 * check method performance
 * @param {string} name
 * @param {never} callback
 * @return {number}
 */
/* eslint-disable-next-line */
export const checkPerformance = (name: string, callback: any): void => {
  const startTime = performance.now()
  callback
  const endTime = performance.now()

  console.log('performance %s: %d ms', name, `${endTime - startTime}`) // per */ms
}

/**
 * sort numbers array order by asc
 * @param {number[]} nums
 * @return {number[]} result
 */
export const sortArrayNumbers = (nums: number[]): number[] => {
  let result: number[] = []
  result = nums.sort((current, next) => {
    if (current < next) return -1
    if (current > next) return 1
    return 0
  })

  return result
}

/**
 * sort numbers array order by desc
 * @param {number[]} nums
 * @return {number[]} result
 */
export const sortArrayNumbersDesc = (nums: number[]): number[] => {
  let result: number[] = []
  result = nums.sort((current, next) => {
    if (current > next) return -1
    if (current < next) return 1
    return 0
  })

  return result
}
