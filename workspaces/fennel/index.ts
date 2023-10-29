export const fennel = <
    Values,
    Callback extends (values: Values) => any,
    CallHook extends (res: ReturnType<Callback>) => any,

    PartialValues = DeepPartial<Values>
>(
    values: Values,
    callbackFn: Callback,
    callHookFn: CallHook = (res => res) as CallHook,
    mergeFn: typeof deepMerge = deepMerge
) => Object.assign(
    (newValues?: PartialValues) =>
        callHookFn(callbackFn(mergeFn(values, newValues))),

    {
        new: (
            newValues?: PartialValues,
            callback: Callback = callbackFn,
            callHook: CallHook = callHookFn,
            merge: typeof mergeFn = mergeFn,
        ) =>
            fennel(merge(values, newValues), callback, callHook, merge),

        values, callbackFn, mergeFn, callHookFn
    }
)

export type DeepPartial<TObj> = { [Key in keyof TObj]?: TObj[Key] extends Record<string, any> ? DeepPartial<TObj[Key]> : TObj[Key] }

export function deepMerge<Whole, Part>(base: Whole, partial?: Part): Whole {
    const result: any = { ...base }

    for (const key in partial)
        if (partial.hasOwnProperty(key) && partial[key] !== undefined)

            if (partial[key] === null)
                result[key] = null

            else if (Array.isArray(partial[key]))
                result[key] = (result[key] || []).concat(partial[key])

            else if (typeof partial[key] === "object")
                result[key] = deepMerge(result[key], partial[key] || {})

            else
                result[key] = partial[key]

    return result as Whole
}
