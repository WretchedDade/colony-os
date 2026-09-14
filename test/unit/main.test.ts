import { beforeEach, describe, expect, it } from "vitest";
import { loop } from "@/main";
import { cleanupDeadCreepMemory } from "@/memory/cleanupDeadCreepMemory";
import { Game, Memory } from "./mock";

interface TestGlobal {
    Game: typeof Game;
    Memory: typeof Memory;
}

describe("main", () => {
    beforeEach(() => {
        const screepsGlobal = globalThis as unknown as TestGlobal;

        screepsGlobal.Game = structuredClone(Game);
        screepsGlobal.Memory = structuredClone(Memory);
    });

    it("exports a loop function", () => {
        expect(typeof loop).toBe("function");
    });

    it("returns void when called with no context", () => {
        expect(loop()).toBeUndefined();
    });

    it("runs creep memory cleanup", () => {
        const screepsGlobal = globalThis as unknown as TestGlobal;

        screepsGlobal.Memory.creeps.persistValue = "any value";
        screepsGlobal.Memory.creeps.notPersistValue = "any value";
        screepsGlobal.Game.creeps.persistValue = "any value";

        loop();

        expect(screepsGlobal.Memory.creeps.persistValue).toBeDefined();
        expect(screepsGlobal.Memory.creeps.notPersistValue).toBeUndefined();
    });
});

describe("cleanupDeadCreepMemory", () => {
    beforeEach(() => {
        const screepsGlobal = globalThis as unknown as TestGlobal;

        screepsGlobal.Game = structuredClone(Game);
        screepsGlobal.Memory = structuredClone(Memory);
    });

    it("deletes memory for creeps that no longer exist", () => {
        const screepsGlobal = globalThis as unknown as TestGlobal;

        screepsGlobal.Memory.creeps.persistValue = "any value";
        screepsGlobal.Memory.creeps.notPersistValue = "any value";
        screepsGlobal.Game.creeps.persistValue = "any value";

        cleanupDeadCreepMemory();

        expect(screepsGlobal.Memory.creeps.persistValue).toBeDefined();
        expect(screepsGlobal.Memory.creeps.notPersistValue).toBeUndefined();
    });
});
