# Colony OS Milestones

This is a learning roadmap, not a feature checklist to finish as quickly as possible. Each milestone should produce a visible in-game improvement, teach one or two Screeps concepts, and leave the codebase understandable.

## How to Use This Roadmap

1. Work on the current milestone until its **definition of done** is true in the simulation or MMO.
2. Pick one **stretch goal** only when the core milestone feels stable.
3. Treat unexpected game behavior as part of the milestone: add logs, form a hypothesis, then make the smallest useful change.
4. Pause to refactor only when the existing code makes the next small step difficult to understand.

The goal is a colony that grows alongside understanding—not an optimized bot copied from a guide.

## 0. Reliable Development Loop

**Purpose:** Make every later experiment quick to observe and safe to change.

**Learn:** ticks, `Game` versus `Memory`, console output, the simulation workflow, and test/build feedback.

**Definition of done**

- The bot runs cleanly each tick and removes dead creep memory.
- A small, useful status message can be enabled when debugging.
- It is clear how to build, test, and upload a change to the simulation.

**Stretch goal:** Track a basic per-tick diagnostic such as current room energy, creep count, or CPU used.

## 1. First Autonomous Economy

**Purpose:** Keep a starter room supplied with energy without manual control.

**Learn:** creep body parts, spawning, energy sources, `harvest()`, `transfer()`, and result codes.

**Definition of done**

- The spawn maintains at least one worker when it has capacity.
- A worker harvests from a source and returns energy to the spawn or extensions.
- When the worker dies, replacement behavior restores the colony automatically.

**Stretch goal:** Give each worker a source assignment instead of relying on arbitrary target selection.

## 2. Useful Worker Behavior

**Purpose:** Turn stored energy into room-controller progress.

**Learn:** creep state machines, `store` APIs, controller upgrading, target selection, and role memory.

**Definition of done**

- Workers switch clearly between collecting and spending energy.
- Available energy is used to upgrade the controller when the spawn does not need it.
- State is resilient when a target, creep, or room object is unavailable.

**Stretch goal:** Add a focused `builder` behavior that prioritizes construction sites.

## 3. Sustainable Room Operations

**Purpose:** Make the colony prioritize energy, building, and upgrading intentionally.

**Learn:** spawn queues, role counts, room-level decisions, construction sites, and simple priorities.

**Definition of done**

- The room decides which role to spawn based on a small set of understandable rules.
- Energy delivery, building, and upgrading do not permanently block one another.
- The colony recovers from all creeps dying or from low available energy.

**Stretch goal:** Introduce a room status object in `Memory` with only data that must persist across ticks.

## 4. Logistics That Scales

**Purpose:** Separate moving resources from using them.

**Learn:** containers, haulers, source-to-destination assignments, capacity planning, and room energy metrics.

**Definition of done**

- Harvesters can deposit energy into containers or storage.
- Haulers keep spawns and extensions supplied before less urgent destinations.
- Role counts react to demand without spawning unlimited creeps.

**Stretch goal:** Record a simple metric that reveals whether harvesting or hauling is the bottleneck.

## 5. Survive and Recover

**Purpose:** Avoid losing the room to predictable disruptions.

**Learn:** hostile detection, towers, safe fallbacks, repair priorities, and defensive room state.

**Definition of done**

- The colony detects hostile creeps with the vision it has.
- Towers attack hostile creeps when present and otherwise perform a useful, limited maintenance task.
- Essential spawning and economy behavior still works after losses.

**Stretch goal:** Add an alert or short room status summary that explains why the colony is in a defensive mode.

## 6. Mature a Single Room

**Purpose:** Reach a stable, understandable higher-RCL room before expanding.

**Learn:** controller-level capability changes, storage, links, terminal basics, planned construction, and CPU budgeting.

**Definition of done**

- New structures are introduced because they solve an observed bottleneck.
- Construction placement has an intentional, documented rule rather than accidental sprawl.
- The room has an inspectable status view for energy, creeps, and primary priorities.

**Stretch goal:** Use links to reduce hauling on high-volume energy routes.

## 7. Expansion and Multi-Room Control

**Purpose:** Apply the same room-operating ideas to a second room without tangled global logic.

**Learn:** scouting, claiming/reserving, remote visibility, per-room managers, inter-room travel, and expansion economics.

**Definition of done**

- The colony scouts and selects an expansion target using stated criteria.
- The new room can bootstrap without breaking the original room.
- Each owned room has separate state and decisions while shared services remain small and explicit.

**Stretch goal:** Operate a remote source while measuring whether it is profitable.

## 8. Choose a Long-Term Direction

At this point, choose the kind of Screeps player and programmer this bot should become. There is no single correct branch:

- **Efficiency:** optimize CPU, spawn bodies, logistics, and resource throughput.
- **Empire building:** expand, run remote mining, trade, and coordinate multiple rooms.
- **Defense and conflict:** build threat models, safe modes, tower strategy, and combat squads.
- **Architecture:** evolve room managers, services, diagnostics, and automated testing.
- **Experimentation:** build unusual strategies, visualizations, or one-off automation projects.

Write the next three concrete outcomes here when a direction becomes exciting.

## Current Focus

**Current milestone:** 0 — Reliable Development Loop.

**Next smallest goal:** Make the bot report one concise, useful room or colony status signal that can be verified in the simulation.

**Why this next:** It creates an observation habit before autonomous behavior becomes more complex.
