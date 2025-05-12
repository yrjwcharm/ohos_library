export interface IMarquee{
  id?:string|number,
  content?:string,
  icon?:PixelMap | ResourceStr | DrawableDescriptor
}
export interface IMarqueeTextStyle{
  fontSize?:Length,
  fontWeight?:number | FontWeight | string
  fontColor?:ResourceColor,
  fontFamily?: string | Resource
}