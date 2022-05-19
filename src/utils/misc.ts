import { format, parseISO } from 'date-fns'

export const formatDate = (date: string) =>
  format(parseISO(date), 'MMMM d, yyyy') // November 24, 2021

export const formatDateComment = (date: string) =>
  format(parseISO(date), 'MMM do') // Nov 24th
