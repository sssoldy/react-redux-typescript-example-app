export enum Filter {
  all = 'all',
  byTag = 'tag',
}

export interface IFiltersState {
  filter: Filter
  value: string | null
}
