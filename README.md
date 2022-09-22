# multi-tab-store

同域下多个标签页共享一套数据。

#### script 标签引入

```
// 下载multi-tab-store.min.js并引入html
<script src="multi-tab-store.min.js"></script>
```

#### npm 引入

```
npm install multi-tab-store --save
```

#### 模块引用

```
import multiTabStore from 'multi-tab-store'
const store = multiTabStore();

store.setItem('Auth', 'as00f0e058585856d'); //存入Auth
const Auth = store.getItem('Auth');           //获取Auth
```
