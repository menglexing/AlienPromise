function AlienPromise (fn) {
    var callbacks = []
    var pending = true
    var context = null
    var args = []

    var done = function (callback) {
        if (typeof callback === 'function') {
            if (pending) {
                callbacks.push(callback)
            } else {
                setTimeout(function(){
                    callback.apply(context, args)
                }, 0)
            }
        }

        return done
    }

    done.state = 0

    var resolve = function () {
        if (!pending) return;

        pending = false
        done.state = 1
        context = this
        args = Array.prototype.slice.call(arguments)

        setTimeout(function(){
            for (var i = 0, l = callbacks.length; i < l; i++) {
                callbacks[i].apply(context, args)
            }

            callbacks = null
        }, 0)
    }

    if (typeof fn === 'function') {
        fn(resolve)
    } else {
        resolve.apply(this, arguments)
    }

    return done
}