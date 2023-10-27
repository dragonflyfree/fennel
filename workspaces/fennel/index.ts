export const fennel = <
    FnInterface,
    Fn extends (vals: FnInterface) => any,
    ConsumerInterface extends PartialFnInterface & { fn?: Fn },

    PartialFnInterface = DeepPartial<FnInterface>,
>(
    defaultValues: FnInterface extends { fn: any } ? never : FnInterface,
    defaultCallback: Fn,
    merge = deepMerge
) => (
    {
        configure(vals: ConsumerInterface) {
            const { fn, ...args } = merge({ fn: defaultCallback, ...defaultValues }, vals)
            return fennel(args as typeof defaultValues, fn, merge)
        },

        call(vals?: ConsumerInterface) {
            const { fn, ...args } = merge({ fn: defaultCallback, ...defaultValues }, vals)
            return fn(args as typeof defaultValues)
        }
    }
)

export type DeepPartial<TObj> = {
    [Key in keyof TObj]?: TObj[Key] extends Record<string, any> ? DeepPartial<TObj[Key]> : TObj[Key]
}

export function deepMerge<TObj>(base: TObj, partial?: Record<string, any>): TObj {
    const result: any = { ...base }

    for (const key in partial)
        if (partial.hasOwnProperty(key))
            if (typeof partial[key] === "object" && partial[key] !== null && !Array.isArray(partial[key]))
                result[key] = deepMerge(result[key], partial[key] || {})
            else if (partial[key] !== undefined)
                result[key] = partial[key]

    return result as TObj
}
