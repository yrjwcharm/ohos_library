# 报错：Failed to execute 'createElement' on 'Document'

**问题现象**

运行报错："Uncaught InvalidCharacterError: Failed to execute 'createElement' on 'Document': The tag name provided ('components/custom/index') is not a valid name."

![faq-pic-626-w800](figures/faq-pic-626.png)

**可能原因**

ASCF的组件is属性不支持组件路径。需要遵循[HTML Standard ](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)规范要求：字母开头，后续有多个[连字符|点号|数字|下划线|小写字母]。

**解决措施**

改为具体的组件名称，并且确保组件已经注册好了。对于小程序转换过程来的场景中，skeleton会采取这种写法，可以去掉is属性。
