import { http } from "@kit.NetworkKit";
import { BusinessError } from "@kit.BasicServicesKit";

export function  getArrayBuffer(url:string,successCallback:(arraybuffer:ArrayBuffer)=>void,failCallback?:(err:BusinessError)=>void){
  let httpRequest = http.createHttp();
  httpRequest.request(url, {
    expectDataType: http.HttpDataType.ARRAY_BUFFER,
    method: http.RequestMethod.GET,
    connectTimeout: 60000,
    readTimeout: 60000
  },
    (err: BusinessError, data: http.HttpResponse) => {
      if (err) {
        failCallback?.(err);
        return
      }
      if (data.result instanceof ArrayBuffer) {
        let imageBuffer = data.result as ArrayBuffer;
        successCallback?.(imageBuffer);
      }
    })
}