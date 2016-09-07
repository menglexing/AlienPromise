# AlienPromise
FP版的promise ... ... 的always？

## 使用示例
```javascript

var getJsReady = ready(function(complete){
    setTimeout(function(){
        complete.call({name: 'Jim'}, 198, 80, 26)
    }, 2000)
})

getJsReady(function(){
    console.log(this)    // => {name: 'Jim'}
    console.log(arguments)    // => [198, 80, 26]
})

// 支持链式调用
getJsReady(function(){

})
(function(){

})
(function(){

})

// 状态
getJsReady.state    // => 0, 未完成; 1, 已完成

```