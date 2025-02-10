/// <reference path="axios.d.ts">

declare interface IResponse<T = any> {
  code: number
  message: string
  data: T
}
