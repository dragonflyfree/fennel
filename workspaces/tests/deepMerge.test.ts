import { describe, test, expect } from "bun:test"

import { deepMerge } from "fennel"

describe("deepMerge", () => {
    test("handles flat objects", () => {
        const obj = { a: 1, b: 2 }
        const partial = { a: 2 }

        const result = deepMerge(obj, partial)
        const expected = { a: 2, b: 2 }

        expect(result).toEqual(expected)
    })

    test("handles nested objects", () => {
        const obj = { a: { b: 1, c: 2 } }
        const partial = { a: { b: 2 } }

        const result = deepMerge(obj, partial)
        const expected = { a: { b: 2, c: 2 } }

        expect(result).toEqual(expected)
    })

    test("handles arrays", () => {
        const obj = { a: [1, 2] }
        const partial = { a: [3] }

        const result = deepMerge(obj, partial)
        const expected = { a: [1, 2, 3] }

        expect(result).toEqual(expected)
    })

    test("handles empty objects, undefined, and null values", () => {
        const obj = { a: {}, b: { c: undefined }, d: "e" as string | null }
        const partial = { a: undefined, b: {}, d: null }

        const result = deepMerge(obj, partial)
        const expected = { a: {}, b: { c: undefined }, d: null }

        expect(result).toEqual(expected)
    })

    test("handles dates", () => {
        const obj = { a: undefined as Date | undefined, b: 2 }
        const partial = { a: new Date() }

        const result = deepMerge(obj, partial)
        const expected = { a: partial.a, b: 2 }

        expect(result).toEqual(expected)
    })

    test("handles functions", () => {
        const obj = { a: () => 1, b: 2 }
        const partial = { a: () => 2 }

        const result = deepMerge(obj, partial)
        const expected = { a: partial.a, b: 2 }

        expect(result).toEqual(expected)
    })
})
