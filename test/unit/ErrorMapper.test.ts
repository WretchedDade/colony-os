import { afterEach, describe, expect, it, vi } from "vitest";
import { ErrorMapper } from "../../src/utils/ErrorMapper";

interface TestGlobal {
    Game: {
        rooms: Record<string, unknown>;
    };
}

describe("ErrorMapper", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("runs the wrapped loop", () => {
        const loop = vi.fn();
        const wrappedLoop = ErrorMapper.wrapLoop(loop);

        wrappedLoop();

        expect(loop).toHaveBeenCalledOnce();
    });

    it("logs escaped errors in the simulator", () => {
        const screepsGlobal = globalThis as unknown as TestGlobal;
        const error = new Error("bad <message> & details");
        const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

        error.stack = "Error: bad <message> & details\n    at loop (main:1:1)";
        screepsGlobal.Game = { rooms: { sim: {} } };

        const wrappedLoop = ErrorMapper.wrapLoop(() => {
            throw error;
        });

        expect(wrappedLoop()).toBeUndefined();
        expect(log).toHaveBeenCalledOnce();
        expect(log.mock.calls[0]?.[0]).toContain("Source maps do not work in the simulator");
        expect(log.mock.calls[0]?.[0]).toContain("bad &lt;message&gt; &amp; details");
    });

    it("rethrows non-error values", () => {
        const thrownValue = "boom";
        const wrappedLoop = ErrorMapper.wrapLoop(() => {
            throw thrownValue;
        });

        let caughtValue: unknown;

        try {
            wrappedLoop();
        } catch (error) {
            caughtValue = error;
        }

        expect(caughtValue).toBe(thrownValue);
    });
});
