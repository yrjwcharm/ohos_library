import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';

//网络接口
export interface IResponseData extends  IFileDownloader{
  classNumber:string,
  className:string;
  url:string,
}