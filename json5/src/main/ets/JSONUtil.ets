import { JSON } from '@kit.ArkTS';

export class JSONUtil {
   static  parse(jsonStr: string){
       try {
           let options: JSON.ParseOptions = { bigIntMode: JSON.BigIntMode.PARSE_AS_BIGINT }
           //通过如下方式解决JSON反序列化过程中导致bigInt类型导致精度丢失的问题
           let data: object =
               JSON.parse(jsonStr, (_: string, value: Object | undefined | null): Object | undefined | null => {
                   if (typeof value === "bigint") {
                       return value?.toString();
                   }
                   return value;
               }, options) as Object;
           return data;
       }catch (e) {
           return new Object();
       }
   }
}
