# Screeps Runtime Lifecycle Notes

## Module Scope Versus the Game Loop

`loop` runs once every game tick. Module-scope code runs when the Screeps JavaScript runtime initializes or experiences a global reset, not on every tick.

The simulation observation on 2026-09-14 showed a module-scope log, followed by several ticks that ran only `loop`, then another module-scope log. The observed reset interval is not a contract and must not be relied on.

## Rule of Thumb

- Use module scope and globals only as disposable caches or reusable services.
- Assume a global reset can discard them at any tick.
- Use `Memory` for state and configuration that must survive ticks and global resets.
- Refresh `Memory`-backed configuration in `loop` when changes should take effect without waiting for a reset.

For example, a module-scope `Logger` instance may be reused across ticks, but its minimum log level should be refreshed from `Memory.settings` in `loop`.

## Why It Matters

This distinction is useful for performance: a cache can avoid repeating work while it exists. It is also essential for correctness: the colony must still work immediately after a global reset.

The official Screeps documentation remains the API authority: https://docs.screeps.com/
