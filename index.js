class Dependency {
    constructor () {
        this.subscribers = []
    }

    depend() {
        if(target && !this.subscribers.includes(target)) this.subscribers.push(target)
    }

    notify() {
        this.subscribers.forEach(sub => sub())
    }
}

let data = {
    price: 5,
    quantity: 2,
    discount: 0.9
}

let target, total

let deps = new Map()

Object.keys(data).forEach(key => {
    deps.set(key, new Dependency())
})

let data_without_proxy = data

data = new Proxy(data_without_proxy, {
    get(obj, key) {
        deps.get(key).depend()
        return obj[key]
    },
    
    set(obj, key, newVal) {
        obj[key] = newVal
        deps.get(key).notify()
        return true
    }
})

function watcher(myFunc) {
    target = myFunc
    target()
    target = null
}

watcher(() => {
    total = data.price * data.quantity
})
