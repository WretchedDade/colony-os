import * as esbuild from "esbuild";
import fs from "node:fs/promises";
import { deploy } from "./deploy.mjs";

const watch = process.argv.includes("--watch");
const deployIndex = process.argv.indexOf("--deploy");
const deployDestination = deployIndex === -1 ? undefined : process.argv[deployIndex + 1];

if (deployIndex !== -1 && !deployDestination) {
    throw new Error("Usage: node scripts/build.mjs --watch --deploy <destination>");
}

const options = {
    bundle: true,
    entryPoints: ["src/main.ts"],
    external: ["main.js.map"],
    format: "cjs",
    outfile: "dist/main.js",
    platform: "node",
    plugins: deployDestination == null ? [] : [uploadAfterBuild(deployDestination)],
    sourcemap: "external",
    target: "es2018"
};

await fs.rm("dist", { force: true, recursive: true });

if (watch) {
    const context = await esbuild.context(options);

    await context.watch();
    console.log(
        deployDestination == null
            ? "Watching src/main.ts and dependencies..."
            : `Watching src/main.ts and dependencies, then uploading to '${deployDestination}' after each successful build...`
    );
} else {
    await esbuild.build(options);
}

function uploadAfterBuild(destination) {
    let pendingUpload = Promise.resolve();

    return {
        name: "screeps-upload-after-build",
        setup(build) {
            build.onEnd(result => {
                if (result.errors.length > 0) {
                    return;
                }

                pendingUpload = pendingUpload.then(() => deploy(destination));
            });
        }
    };
}
