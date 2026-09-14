import { ErrorMapper } from "./utils/ErrorMapper";
import { cleanupDeadCreepMemory } from "./memory/cleanupDeadCreepMemory";

console.log("Colony OS Screeps script loaded");
export const loop = ErrorMapper.wrapLoop((): void => {
    cleanupDeadCreepMemory();
});
