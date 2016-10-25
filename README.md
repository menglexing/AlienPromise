# AlienPromise
FP版的promise ... ... 的always？

## 使用示例
```javascript

var loadScript = AlienPromise(function(resolve){
    var script = document.createElement('script')

    script.onload = function () {
        resolve.call(script, true)
    }

    script.onerror = function () {
        resolve.call(script, false)
    }

    script.src = '2333'
})

loadScript(function(success){
    console.log(this)    // => script
    alert(success ? '加载成功' : '加载失败')
})

// 支持链式调用
loadScript(function(){

})
(function(){

})
(function(){

})

// 状态
loadScript.state    // => 0, 未完成; 1, 已完成

```