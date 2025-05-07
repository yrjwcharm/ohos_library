export interface IMarquee{
  id?:string|number,
  content?:string
}
export interface IMarqueeTextStyle{
  fontSize?:Length,
  fontWeight?:number | FontWeight | string
  fontColor?:ResourceColor,
  fontFamily?: string | Resource
}