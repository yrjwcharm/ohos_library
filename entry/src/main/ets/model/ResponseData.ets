import { FileDownloader } from "@ohos_lib/filedownload/src/main/ets/model/FileDownloader";

//网络接口
export class  ResponseData extends  FileDownloader{
  public classNumber:string=''
  public className:string=''
  public fileUrl:string=''
}
//1.1.6及之前版本 使用接口定义形式
// export interface IResponseData extends IFileDownloader{
//   classNumber:string;
//   className:string;
//   url:string;
// }