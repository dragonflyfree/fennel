export const fennel = <
    FnInterface,
    Fn extends (vals: FnInterface) => any,
    ConsumerInterface extends DeepPartial<FnInterface> & { fn?: Fn }
>(
    defaultValues: FnInterface extends { fn: any } ? never : FnInterface extends { props: any } ? never : FnInterface,
    defaultCallback: Fn
) => (
    {
        configure(vals: ConsumerInterface) {
            const { fn, ...args } = deepMerge({ fn: defaultCallback, ...defaultValues }, vals)
            return fennel(args as typeof defaultValues, fn)
        },

        call(vals?: ConsumerInterface | { props?: ConsumerInterface }) {
            if (vals !== undefined && "props" in vals)
                vals = vals.props

            const { fn, ...args } = deepMerge({ fn: defaultCallback, ...defaultValues }, vals)
            return fn(args as typeof defaultValues)
        }
    }
)

type DeepPartial<T> = { [P in keyof T]?: T[P] extends Record<string, any> ? DeepPartial<T[P]> : T[P] }

function deepMerge<T>(base: T, partial?: Record<string, any>): T {
    const result: any = { ...base }

    for (const key in partial)
        if (partial.hasOwnProperty(key))
            if (typeof partial[key] === "object" && partial[key] !== null && !Array.isArray(partial[key]))
                result[key] = deepMerge(result[key], partial[key] || {})
            else if (partial[key] !== undefined)
                result[key] = partial[key]

    return result as T
}