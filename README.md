# colony-os

`colony-os` is my Screeps implementation: a programmable colony operating system for managing rooms, creeps, economy, logistics, defense, and expansion in the persistent Screeps world.

Screeps is an MMO programming game where your code is the player. Instead of clicking units around, you write JavaScript or TypeScript that runs continuously and controls your colony.

## Project Goals

- Build a maintainable Screeps bot that can grow from simple room automation into a larger colony architecture.
- Favor understandable systems over clever shortcuts.
- Keep the codebase friendly for learning, experimenting, and refactoring as the colony evolves.
- Use AI assistance as a coaching tool while keeping the core design and implementation decisions human-led.

## Development Philosophy

This repo is meant to be a place to learn by building. AI assistance is welcome for explaining concepts, reviewing designs, suggesting tradeoffs, debugging, and helping break problems into manageable steps. The default expectation is that implementation should be guided, not done wholesale by the assistant.

When in doubt, prefer small, testable changes and clear reasoning over large generated features.

## TypeScript Starter

This project uses the Screeps TypeScript starter pattern: TypeScript source in `src/`, esbuild bundling to `dist/main.js`, and a small deploy script for optional upload to Screeps branches.

Common commands:

- `npm run build` compiles and bundles without uploading.
- `npm run check` runs all verification and then builds the bundle.
- `npm run format` formats supported repository files with Prettier.
- `npm run verify` checks formatting, linting, tests, and TypeScript types.
- `npm test` runs the unit tests.
- `npm run lint` checks the TypeScript source and tests.
- `npm run deploy:main` verifies, builds, and uploads to the `main` destination in `screeps.json`.
- `npm run deploy:sim` verifies, builds, and uploads to the `sim` destination in `screeps.json`.
- `npm run watch` continuously rebuilds while you iterate locally.
- `npm run watch:sim` continuously rebuilds and uploads to the `sim` destination while you iterate locally.

To enable uploading, copy `screeps.sample.json` to `screeps.json`, then replace the placeholder token or private-server credentials. `screeps.json` is ignored by git so credentials do not get committed.

Every one-shot `deploy:*` command runs `npm run verify` before uploading. The `watch:*` commands are intended for rapid local iteration and do not run the full verification suite before every watched rebuild.

## Automation

The pre-commit hook runs Prettier through lint-staged. Only staged files are formatted, and lint-staged adds the formatted results back to the commit automatically. Running `npm install` configures the hook through Husky.

GitHub Actions verifies pull requests and pushes to `main`. After verification succeeds on a push to `main`, it uploads the bundle to the Screeps `main` branch using the `main` GitHub environment. The workflow can also be run manually to deploy either `main` or `simulation`; simulation uploads use the `simulation` GitHub environment and the Screeps `sim` branch.

Both GitHub environments require a `SCREEPS_TOKEN` environment secret. The token is passed through the environment and is never written to the repository.

## Planned Areas

See [the milestone roadmap](docs/milestones.md) for a learning-oriented progression and definitions of done.

- Creep role behavior
- Spawn and energy management
- Room memory and state modeling
- Construction planning
- Hauling and logistics
- Defense and threat response
- Expansion strategy
- Observability and debugging tools

## Status

This project is just getting started.
