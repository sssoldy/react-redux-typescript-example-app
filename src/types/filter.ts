export enum Filter {
  all = 'all',
  byTag = 'tag',
}

export interface FiltersState {
  filter: Filter
  value: string | null
}
