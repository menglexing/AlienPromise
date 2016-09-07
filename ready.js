function ready (fn) {
    var callbacks = []
    var isReady = false
    var context = null
    var args = []

    var complete = function () {
        isReady = true
        onready.state = 1

        while (callbacks.length) {
            callbacks.shift().apply(context, args)
        }
    }

    if (typeof fn === 'function') {
        fn(function(){
            context = this
            args = arguments

            setTimeout(complete, 0)
        })
    } else {
        context = this
        args = arguments

        setTimeout(complete, 0)
    }

    onready.state = 0

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