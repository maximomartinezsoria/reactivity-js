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

Object.keys(data).forEach(key => {
    let internalValue = data[key]
    const dep = new Dependency();

    Object.defineProperty(data, key, {
        get() {
            dep.depend()
            return internalValue
        },

        set(newVal) {
            internalValue = newVal
            dep.notify()
        }
    })
})

function watcher(myFunc) {
    target = myFunc
    target()
    target = null
}

watcher(() => {
    total = data.price * data.quantity
})
