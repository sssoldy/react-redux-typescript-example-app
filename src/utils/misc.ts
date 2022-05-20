import { format, parseISO } from 'date-fns'
import { IArticleFilter } from '../types/filter'

export const formatDate = (date: string) =>
  format(parseISO(date), 'MMMM d, yyyy') // November 24, 2021

export const formatDateComment = (date: string) =>
  format(parseISO(date), 'MMM do') // Nov 24th

const stringifyFilter = (obj: IArticleFilter) => JSON.stringify(obj)
export const isFiltersEqual = (
  prevFilter: IArticleFilter,
  curFilter: IArticleFilter,
) => {
  return stringifyFilter(prevFilter) === stringifyFilter(curFilter)
}
