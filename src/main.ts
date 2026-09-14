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

    const spawn = Object.values(Game.spawns)[0];

    if (!spawn) {
        logger.warning("No spawn found. Please create a spawn to start the colony.");
        return;
    }

    if (Object.keys(Game.creeps).length === 0) {
        spawn.spawnCreep([WORK, CARRY, MOVE], "Worker");
    }

    for (const creep of Object.values(Game.creeps)) {
        if (creep.store.getFreeCapacity() > 0) {
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure =>
                    structure.structureType === STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            if (target && creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
});
