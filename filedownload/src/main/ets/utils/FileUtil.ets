import { fileIo } from '@kit.CoreFileKit';

/**
 * 文件操作相关工具类
 */
export class FileUtil {
  public static joinPath(parent: string, child: string): string {
    if (parent.endsWith('/')) {
      return parent + child;
    }
    return parent + '/' + child;
  }

  public static getFileSize(path: string): number {
    try {
      if (!fileIo.accessSync(path)) {
        return 0;
      }
      return fileIo.statSync(path).size;
    } catch (e) {
      return 0;
    }
  }

  public static removePath(path: string): void {
    try {
      if (!fileIo.accessSync(path)) {
        return;
      }
      try {
        class ListFileOption {
          public recursion: boolean = false;
          public listNum: number = 0;
        }

        let filenames = fileIo.listFileSync(path, new ListFileOption());
        filenames.forEach((filename: string) => {
          FileUtil.removePath(FileUtil.joinPath(path, filename));
        })
        fileIo.rmdirSync(path);
      } catch (e) {
        fileIo.unlinkSync(path);
      }
    } catch (e) {
    }
  }

  //视频文件下载读取字节数据、然后给目标临时文件tmp写入数据
  public static readFileBytes(srcPath: string, dstPath: string, exitFrequency?: number, status?: number) {
    if (fileIo.accessSync(srcPath)) {
      if (status === 0 && exitFrequency && exitFrequency !== 1) {
        return;
      }
      //读取数据
      let file = fileIo.openSync(srcPath, fileIo.OpenMode.READ_WRITE);
      let buf = new ArrayBuffer(fileIo.statSync(file.fd).size);
      fileIo.readSync(file.fd, buf);
      fileIo.closeSync(file);
      //写入数据
      try {
        let file0 =
          fileIo.openSync(dstPath, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.APPEND);
        let writeLen = fileIo.writeSync(file0.fd, buf);
        fileIo.closeSync(file0)
        console.info("write data to file succeed and size is:" + writeLen);
      } catch (e) {
      }
    }
  }

  //下载完成后删除临时文件
  public static deleteTmpFile(context: Context, fileName: string, downloadId: string) {
    let srcPath = FileUtil.joinPath(FileUtil.joinPath(context.filesDir, downloadId), fileName);
    let dstPath = FileUtil.joinPath(FileUtil.joinPath(context.filesDir, "tmp"), downloadId)
    try {
      if (fileIo.accessSync(dstPath)) {
        let tmpFilePath = FileUtil.joinPath(dstPath, fileName);
        FileUtil.readFileBytes(srcPath, tmpFilePath);
        fileIo.copyFileSync(tmpFilePath, srcPath);
        FileUtil.removePath(tmpFilePath)
        if (FileUtil.getDirectorySize(dstPath) === 0) {
          fileIo.rmdirSync(dstPath)
          let tmpRootPath = FileUtil.joinPath(context.filesDir, "tmp");
          if (FileUtil.getDirectorySize(tmpRootPath) === 0) {
            fileIo.rmdirSync(tmpRootPath)
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
      srcPath = FileUtil.joinPath(srcPath, fileName)
      dstPath = FileUtil.joinPath(dstPath, fileName)
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
    if (!fileIo.accessSync(path)) {
      return 0;
    }
    let size = 0

    class ListFileOption { //制定筛选规则
      public recursion: boolean = true; //true为获取该文件夹下所有文件,包括子目录文件
      public listNum: number = 0; //获取文件的数量，为0时获取所有文件
    }

    let option = new ListFileOption()
    let filenames = fileIo.listFileSync(path, option)

    for (let i = 0; i < filenames.length; i++) {
      size += fileIo.statSync(FileUtil.joinPath(path, filenames[i])).size
    }
    return size
  }
}
