// 全局订阅代理对象
var Event = (() => {
    var clientList = {},
        bindObj = null, // 硬绑定this
        listen,
        trigger,
        remove;

    listen = function(key, fn) {
        if(!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };

    trigger = function() {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];

        if(!fns || fns.length === 0) return;

        fns.forEach((fn) => {
            fn.apply(this.bindObj || this, arguments)
        });
    };

    remove = function(key, fn) {
        var fns = clientList[key];
        if(!fns || fns.length === 0) return false;

        if(!fn) {
            fns && (fns.length = 0);
        }else {
            // 反向循环找到删除项
            for(let i = fns.length; i >= 0; i--) {
                let _fn = fns[i];
                if (fn === _fn) {
                    fns.splice(i, 1);
                }
            }
        }
    };

    return {
        bindObj,
        clientList,
        listen,
        trigger,
        remove
    }
})()