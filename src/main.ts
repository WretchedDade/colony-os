import { ErrorMapper } from "./utils/ErrorMapper";
import { cleanupDeadCreepMemory } from "./memory/cleanupDeadCreepMemory";
import { Logger } from "./logging/Logger";

const logger = new Logger("info");

export const loop = ErrorMapper.wrapLoop((): void => {
    logger.setLevel(Memory.settings?.logLevel ?? "info");

    if (Game.time % 50 === 0) {
        logger.info("[Heartbeat 🫀] Colony OS loop running at tick", Game.time);
    }

    cleanupDeadCreepMemory();
});
