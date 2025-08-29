import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/model/FileDownloader';

//网络接口
export interface IResponseData extends  IFileDownloader{
  classNumber:string,
  className:string;
  url:string,
}