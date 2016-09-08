function ready (fn) {
    var callbacks = []
    var isReady = false
    var context = null
    var args = []

    onready.state = 0

    var complete = function () {
        if (isReady) return;

        isReady = true
        onready.state = 1
        context = this
        args = Array.prototype.slice.call(arguments)

        setTimeout(function(){
            while (callbacks.length) {
                callbacks.shift().apply(context, args)
            }
        }, 0)
    }

    if (typeof fn === 'function') {
        fn(function(){
            complete.apply(this, arguments)
        })
    } else {
        complete.apply(this, arguments)
    }

    function onready (callback) {
        if (typeof callback === 'function') {
            if (isReady) {
                setTimeout(function(){
                    callback.apply(context, args)
                }, 0)
            } else {
                callbacks.push(callback)
            }
        }

        return onready
    }

    return onready
}