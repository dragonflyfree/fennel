import { fennel } from "fennel"

const example = fennel(
    {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
    },
    ({ a, b, c, d }) => { console.log(a, b, c, d) }
)

example.call()

example.call({ a: -1, c: -3 })

example.call()

const example2 = example.configure({ b: 20, d: 40 })

example.call()

example2.call()

const example3 = example2.configure({ a: 0, fn({ a, b, c, d }) { console.log(d, c, b, a) } })

example.call()

example2.call()

example3.call()

const composed = fennel(
    { run: example.call },
    ({ run }) => run()
)

composed.call()
composed.call({ run: example2.call })
composed.call({ run: example.configure({ a: 0 }).call })