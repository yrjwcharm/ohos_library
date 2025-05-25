/**
 Copyright 2024 csx - @yunkss/ef_core

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */


/**
 * @Author csx
 * @DateTime 2023/12/29 21:52
 * @TODO StringBuilder
 * @Use 详细使用方法以及文档详见ohpm官网,地址https://ohpm.openharmony.cn/#/cn/detail/@yunkss%2Fef_core
 */
export class StringBuilder {
  private value: (string | number | boolean | null)[];

  constructor() {
    this.value = [];
  }

  append(str: string | number | boolean | null): StringBuilder {
    this.value.push(str);
    return this;
  }


  toString(): string {
    return this.value.join('');
  }
}