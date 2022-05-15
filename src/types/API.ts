export enum ResponseStatus {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
}

export type ResponseError = string | null
