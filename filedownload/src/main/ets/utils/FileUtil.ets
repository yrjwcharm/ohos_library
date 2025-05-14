import { fileIo } from '@kit.CoreFileKit';

/**
 * 文件操作相关工具类
 */
export class FileUtil {
  //视频文件下载读取字节数据、然后给目标临时文件tmp写入数据
  public static readFileBytes(srcPath: string, dstPath: string, exitFrequency?: number, status?: number) {
    if (fileIo.accessSync(srcPath)) {
      //读取数据
      let file = fileIo.openSync(srcPath, fileIo.OpenMode.READ_WRITE);
      let buf = new ArrayBuffer(fileIo.statSync(file.fd).size);
      fileIo.readSync(file.fd, buf);
      fileIo.closeSync(file);
      //写入数据
      try {
        let file0 =
          fileIo.openSync(dstPath, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.APPEND);
        if (status === 0) {
          if (exitFrequency && exitFrequency !== 1) {
            return;
          }
        }
        let writeLen = fileIo.writeSync(file0.fd, buf);
        fileIo.closeSync(file0)
        console.info("write data to file succeed and size is:" + writeLen);
      } catch (e) {
      }
    }
  }

  //下载完成后删除临时文件
  public static deleteTmpFile(context: Context, fileName: string, downloadId: string) {
    let srcPath = context.cacheDir + "/" + downloadId + '/' + fileName;
    let dstPath = context.cacheDir + "/tmp/" + downloadId
    try {
      if (fileIo.accessSync(dstPath)) {
        FileUtil.readFileBytes(srcPath, dstPath + '/' + fileName);
        fileIo.copyFileSync(dstPath + '/' + fileName, srcPath);
        fileIo.unlinkSync(dstPath + '/' + fileName)
        if (FileUtil.getDirectorySize(dstPath) === 0) {
          fileIo.rmdirSync(dstPath)
          if (FileUtil.getDirectorySize(context.cacheDir + "/tmp/") === 0) {
            fileIo.rmdirSync(context.cacheDir + '/tmp/')
          }
        }
      }
    } catch (e) {
    }
  }

  //把下载的视频字节数存储到临时文件夹下面
  public static writeTmpBytes(srcPath: string, dstPath: string, fileName: string, exitFrequency?: number,
    status?: number) {
    try {
      if (!fileIo.accessSync(dstPath)) {
        //以同步方法创建目录。当recursion指定为true，可多层级创建目录。
        fileIo.mkdirSync(dstPath, true);
      }
      //a+：以附加方式打开可读写的文件。若文件不存在，则会建立该文件，
      // 如果文件存在，写入的数据会被加到文件尾后，即文件原先的内容会被保留。
      srcPath = srcPath + '/' + fileName
      dstPath = dstPath + '/' + fileName
      let dstStream: fileIo.Stream;
      dstStream = fileIo.createStreamSync(dstPath, "a+");
      dstStream.closeSync();
      FileUtil.readFileBytes(srcPath, dstPath, exitFrequency, status);
    } catch (e) {
    }
  }
  static getDirectoryListFile(path: string) {
    class ListFileOption { //制定筛选规则
      public recursion: boolean = true; //true为获取该文件夹下所有文件,包括子目录文件
      public listNum: number = 0; //获取文件的数量，为0时获取所有文件
    }

    let option = new ListFileOption()
    let filenames = fileIo.listFileSync(path, option)
    return filenames;
  }

  //获取文件夹下面所有文件总字节数
  static getDirectorySize(path: string): number {
    let size = 0

    class ListFileOption { //制定筛选规则
      public recursion: boolean = true; //true为获取该文件夹下所有文件,包括子目录文件
      public listNum: number = 0; //获取文件的数量，为0时获取所有文件
    }

    let option = new ListFileOption()
    let filenames = fileIo.listFileSync(path, option)

    for (let i = 0; i < filenames.length; i++) {
      size += fileIo.statSync(path + filenames[i]).size
    }
    return size
  }
}
