import { type Omit_, type Override, range } from "./index";
import { describe, expect, expectTypeOf, it, test } from "vitest";

test("Omit_", () => {
	type User = { id: string; name: string; age: number };
	type UserWithoutIdAndAge = Omit_<User, "id" | "age">;
	expectTypeOf<UserWithoutIdAndAge>().toEqualTypeOf<{
		name: string;
	}>();
});

test("Override", () => {
	type User = { id: string; name: string; age: number };
	type AnotherUser = Override<
		User,
		{
			id: number;
			age?: number;
		}
	>;
	// vitest complains that
	//   Type '{ id: number; name: string; age?: number | undefined; }' does not satisfy the constraint '{ id: number; age: number | undefined; name: string; }'.
	//   Property 'age' is optional in type '{ id: number; name: string; age?: number | undefined; }' but required in type '{ id: number; age: number | undefined; name: string; }'.ts(2344)
	// @ts-expect-error
	expectTypeOf<AnotherUser>().toEqualTypeOf<{
		id: number;
		name: string;
		age?: number | undefined;
	}>();

	// but ts does not complain
	const _: AnotherUser = {
		id: 1,
		name: "Alice",
	};
});

describe("range", () => {
	it("throws RangeError if step=0", () => {
		expect(() => {
			range(0, 10, 0);
		}).toThrow(RangeError);
	});

	// overload2
	describe("overload2", () => {
		test("start=5, stop=5, step=1", () => {
			expect(range(-5, 5, 1)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]);
		});
		test("start=-5, stop=5, step=2", () => {
			expect(range(-5, 5, 2)).toEqual([-5, -3, -1, 1, 3]);
		});
		test("start=-5, stop=5, step=3", () => {
			expect(range(-5, 5, 3)).toEqual([-5, -2, 1, 4]);
		});
		test("start=-5, stop=5, step=5", () => {
			expect(range(-5, 5, 5)).toEqual([-5, 0]);
		});
		test("start=-5, stop=5, step=6", () => {
			expect(range(-5, 5, 6)).toEqual([-5, 1]);
		});
		test("start=-5, stop=5, step=10", () => {
			expect(range(-5, 5, 10)).toEqual([-5]);
		});
		test("start=-5, stop=5, step=11", () => {
			expect(range(-5, 5, 11)).toEqual([-5]);
		});

		test("start=5, stop=-5, step=-1", () => {
			expect(range(5, -5, -1)).toEqual([5, 4, 3, 2, 1, 0, -1, -2, -3, -4]);
		});
		test("start=5, stop=-5, step=-2", () => {
			expect(range(5, -5, -2)).toEqual([5, 3, 1, -1, -3]);
		});
		test("start=5, stop=-5, step=-3", () => {
			expect(range(5, -5, -3)).toEqual([5, 2, -1, -4]);
		});
		test("start=5, stop=-5, step=-5", () => {
			expect(range(5, -5, -5)).toEqual([5, 0]);
		});
		test("start=5, stop=-5, step=-6", () => {
			expect(range(5, -5, -6)).toEqual([5, -1]);
		});
		test("start=5, stop=-5, step=-10", () => {
			expect(range(5, -5, -10)).toEqual([5]);
		});
		test("start=5, stop=-5, step=-11", () => {
			expect(range(5, -5, -11)).toEqual([5]);
		});

		test("start=5, stop=-5, step=1", () => {
			expect(range(5, -5, 1)).toEqual([]);
		});
	});

	describe("overload1", () => {
		test("stop=5", () => {
			expect(range(5)).toEqual([0, 1, 2, 3, 4]);
		});
		test("stop=0", () => {
			expect(range(0)).toEqual([]);
		});
		test("stop=-10", () => {
			expect(range(-10)).toEqual([]);
		});
	});
});
