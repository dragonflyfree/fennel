export const fennel = <
    FnInterface,
    Fn extends (args: FnInterface) => any,
    ConsumerInterface extends PartialFnInterface & { fn?: Fn },

    PartialFnInterface = DeepPartial<FnInterface>,
>(
    defaultVals: FnInterface extends { fn: any } ? never : FnInterface,
    defaultFn: Fn,
    merge = deepMerge
) => (
    {
        configure(newVals: ConsumerInterface) {
            const { fn, ...args } = merge({ fn: defaultFn, ...defaultVals }, newVals)
            return fennel(args as typeof defaultVals, fn, merge)
        },

        call(newVals?: ConsumerInterface) {
            const { fn, ...args } = merge({ fn: defaultFn, ...defaultVals }, newVals)
            return fn(args as typeof defaultVals)
        }
    }
)

export type DeepPartial<TObj> = { [Key in keyof TObj]?: TObj[Key] extends Record<string, any> ? DeepPartial<TObj[Key]> : TObj[Key] }

export function deepMerge<TObj, TPartial = DeepPartial<TObj>>(base: TObj, partial?: TPartial): TObj {
    const result: any = { ...base }

    for (const key in partial)
        if (partial.hasOwnProperty(key) && partial[key] !== undefined)

            if (partial[key] === null)
                result[key] = null

            else if (Array.isArray(partial[key]))
                result[key] = result[key].concat(partial[key])

            else if (typeof partial[key] === "object")
                result[key] = deepMerge(result[key], partial[key] || {})

            else result[key] = partial[key]

    return result as TObj
}