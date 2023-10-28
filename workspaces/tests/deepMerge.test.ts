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

    test("handles empty objects", () => {
        const obj = { a: 1 }
        const partial = {}

        const result = deepMerge(obj, partial)
        const expected = { a: 1 }

        expect(result).toEqual(expected)
    })

    test("handles nested empty objects", () => {
        const obj = { a: { b: 1 } }
        const partial = { a: {} }

        const result = deepMerge(obj, partial)
        const expected = { a: { b: 1 } }

        expect(result).toEqual(expected)
    })

    test("handles arrays", () => {
        const obj = { a: [1, 2] }
        const partial = { a: [3] }

        const result = deepMerge(obj, partial)
        const expected = { a: [1, 2, 3] }

        expect(result).toEqual(expected)
    })

    test("handles null and undefined values", () => {
        const obj = { a: 1, b: 2 as number | null }
        const partial = { a: undefined, b: null }

        const result = deepMerge(obj, partial)
        const expected = { a: 1, b: null }

        expect(result).toEqual(expected)
    })

    test("handles null and undefined values in nested objects", () => {
        const obj = { a: { b: 1, c: 2 } }
        const partial = { a: { b: undefined } }

        const result = deepMerge(obj, partial)
        const expected = { a: { b: 1, c: 2 } }

        expect(result).toEqual(expected)
    })

    test("handles non-primitives", () => {
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