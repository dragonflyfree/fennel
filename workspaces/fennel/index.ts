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
        if (partial.hasOwnProperty(key))
            if (typeof partial[key] === "object" && partial[key] !== null && !Array.isArray(partial[key]))
                result[key] = deepMerge(result[key], partial[key] || {})
            else if (partial[key] !== undefined)
                result[key] = partial[key]

    return result as TObj
}