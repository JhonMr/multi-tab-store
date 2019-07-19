# multitabstorage
同域下多页共享暂时数据，共享--多页共同维护一套数据、暂时--当所有同域页面都关闭时这套被维护的数据将消失。

#### npm引入
```
npm install multitabstorage
```

#### 模块引用
```
import multitabstorage from 'multitabstorage'
window.multiTabStorage = multitabstorage();

window.multiTabStorage.setItem('Auth', 'as00f0e058585856d'); //存入Auth
var Auth = window.multiTabStorage.getItem('Auth');           //获取Auth
window.multiTabStorage.removeItem('Auth');                   //删除Auth
window.multiTabStorage.clear();                              //清空storage
```
