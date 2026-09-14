import type { LogLevel } from "@/logging/Logger";

declare global {
    interface Memory {
        settings?: {
            logLevel?: LogLevel;
        };
    }

    interface CreepMemory {}
}

export {};
