# JavaScript 工具

## 类

- [EventBus](#EventBus)：事件处理类
- [LoopSearch](#LoopSearch)：循环查询类
- [TreeData](#TreeData)：树结构数据类
  - BaseTree：TreeData 继承自 BaseTree

## 日期时间

- [dateFormat](#dateFormat)：格式化日期时间

- [getDuration](#getDuration)：将时间戳转换为时长

## 验证

- [isEmail](#isEmail)：是否是邮箱

## 操作

- [joinSeparator](#joinSeparator)：将数组元素用指定分隔符拼接成字符串
- [splitSeparator](#splitSeparator)：将字符串用指定分隔符分割开
- [findTargetVal](#findTargetVal)：从数组中找到指定 key 的值等于给定值的元素
- [storage](#storage)：是一个对象，可以对浏览器存储读写操作
- [mapToOptions](#mapToOptions)：一个方法接受一个map数据结构，返回形如el-select下拉列表样的数据

## VUE

- findVueComponent：根据 vue 组件名称查找组件

## 其他

- deleteEmptyProperties：深度删除属性值是空（null,undefined,''）的属性

- deleteNullProperties：深度删除属性值是 null 的属性

- getValueByPath：根据路径从对象中获取值
- storage：操作浏览器存储的对象

## 示例

#### EventBus

```js
import { EventBus } from '@liz-q/utils'
const eventBus = new EventBus()

eventBus.on('event-bus-click', (params) => {
    console.log(params)
})

eventBus.emit('event-bus-click', 123)
```

#### LoopSearch

```js
import { LoopSearch } from '@liz-q/utils'

const loopSearch = new LoopSearch({
    // 5 秒执行一次，不传默认是 3 秒
    delay: 5 * 1000,
    // 要循环的方法
    loopFn: loopMethod,
    // 判断方法，如果返回 true 进入下次循环，返回 false 停止循环
    // 参数 res 就是 loopFn 返回的参数，所以 loopFn 必须要 return
    whenFn: (res) => {
        return res === true
    }
})

async function loopMethod () {
    // 这里要 return 接口响应的报文
    return axios.get(...) 
}
 
// 开始执行                    
loopSearch.start()
    
// 终止执行                    
loopSearch.stop()
```

#### TreeData

```js
import { TreeData, BaseTree } from '@liz-q/utils'

const demoData = [
    {
        id: '1',
        name: '1',
        children: [
            {
                id: '1-1',
                name: '1-1'
            }
        ]
    }
]

const treeData = new TreeData(demoData, {
    key: 'id',            // 不传默认是id
    children: 'children', // 不传默认是children
    isLeaf: 'isLeaf'      // 不传默认是isLeaf
})

/* 获取节点 */
const node = treeData.getNode('1-1')

/* 遍历树 */
treeData.traverseTree((node, parentNode, index) => {
    // 回调函数 cb
}, (node) => {
    // 条件函数 只有返回 true 的节点才会进入回调函数 cb
})

/* 过滤树 */
// 第二个参数如果为true 会在函数内部会深拷贝一棵树然后再过滤。不想影响原树时可以传true
const subTree = treeData.filterTree((node) => {
    // 条件函数返回 boolean
}, true)

/* 获取叶子节点 */
const leafs = treeData.getLeafs()

/* 获取 1 到 level 级子树 */
const subLevelTree = treeData.getSubTreeByLevel(3)

/* 获取树最大层级数和节点所在层级数 */
const { max, targetLevel } = treeData.getTreeLevel('1-1') // 参数为id

/* 添加子节点 */
treeData.addChild(parentId, childData)

/* 删除父节点下所有子节点 */
treeData.removeChild(parentId)
```

#### dateFormat

```javascript
import { dateFormat } from "@liz-q/utils"

dateFormat(1689818893967) // 2023-07-20 10:08:13
dateFormat('2023/07/20 10:08:13') // 2023-07-20 10:08:13
dateFormat('2023/07/20 10:08:13', 'YYYY-MM-DD') // 2023-07-20
```

#### getDuration

```javascript
import { getDuration } from "@liz-q/utils"

getDuration(158884656) // 1天20时8分4秒656毫秒
getDuration(158884656, true) 
// [{"num":1,"unit":"D"},{"num":20,"unit":"H"},{"num":8,"unit":"M"},{"num":4,"unit":"S"},{"num":656,"unit":"MS"}]

```

#### isEmail

```js
import { isEmail } from "@liz-q/utils"

isEmail('1595397386@qq.com') // true
isEmail('15953973qq.com') // false
```

#### joinSeparator

```js
import { joinSeparator } from "@liz-q/utils"

joinSeparator(['a', 'b', 'c']) // 'a/b/c'
joinSeparator(['a', 'b', 'c'], ',') // 'a,b,c'
```

#### splitSeparator

```js
import { splitSeparator } from "@liz-q/utils"

splitSeparator('a/b/c') // ['a', 'b', 'c']
splitSeparator('a,b,c', ',') // ['a', 'b', 'c']
```

#### findTargetVal

```js
import { findTargetVal } from "@liz-q/utils"

const arr = [
    { name: '张三', value: '1' },
    { name: '李四', value: '2' },
    { name: '王五', value: '3' },
]
findTargetVal('2', arr) // { name: '李四', value: '2' }

const arr = [
    { name: '张三', id: '1' },
    { name: '李四', id: '2' },
    { name: '王五', id: '3' },
]
findTargetVal('2', arr, 'id') 
```



#### storage

```javascript
import { storage } from "@liz-q/utils"

// 存入sessionStorage
storage.set('test', '123') 
storage.set('test', '123', 'session')
storage.set('test', '123', 'sessionStorage')
storage.get('test') // 123
storage.get('test', 'session') // 123
storage.get('test', 'sessionStorage') // 123

// 存入localStorage
storage.set('test', '123', 'local') 
storage.set('test', '123', 'localStorage') 
storage.get('test', 'local') // 123
storage.get('test', 'localStorage') // 123
```

#### mapToOptions

```js
import { mapToOptions } from "@liz-q/utils"

const SELECT_RANGE_MAP = new Map([
  [1, '男'],
  [2, '女']
])

mapToOptions(SELECT_RANGE_MAP)

返回
[
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]
```



