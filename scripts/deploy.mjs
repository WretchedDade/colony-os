import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import process from "node:process";
import { ScreepsHttpClient } from "screeps-api";

const destination = process.argv[2];

if (isDirectRun()) {
    if (!destination) {
        throw new Error("Usage: node scripts/deploy.mjs <destination>");
    }

    await deploy(destination);
}

export async function deploy(destinationName) {
    const config = await loadConfig(destinationName);
    const branch = process.env.SCREEPS_BRANCH ?? config.branch ?? destinationName;
    const modules = await readModules("dist");
    const api = new ScreepsHttpClient({
        url: serverUrl(config),
        token: config.token,
        email: config.email,
        password: config.password
    });

    const branches = await api.userBranches();
    const branchExists = branches.list.some(item => item.branch === branch);

    if (branchExists) {
        await api.userCodeSet({ branch, modules });
    } else {
        await api.userCloneBranch("", branch, modules);
    }

    console.log(`Uploaded ${Object.keys(modules).length} module(s) to Screeps branch '${branch}'.`);
}

async function loadConfig(destinationName) {
    if (process.env.SCREEPS_TOKEN) {
        return {
            token: process.env.SCREEPS_TOKEN,
            protocol: process.env.SCREEPS_PROTOCOL ?? "https",
            hostname: process.env.SCREEPS_HOSTNAME ?? "screeps.com",
            port: Number(process.env.SCREEPS_PORT ?? 443),
            path: process.env.SCREEPS_PATH ?? "/",
            branch: process.env.SCREEPS_BRANCH ?? destinationName
        };
    }

    try {
        const text = await fs.readFile("screeps.json", "utf8");
        const configFile = JSON.parse(text);
        const destinationConfig = configFile[destinationName];

        if (destinationConfig != null) {
            return destinationConfig;
        }
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }

    throw new Error(`No configuration found for '${destinationName}'. Create screeps.json or set SCREEPS_TOKEN.`);
}

async function readModules(directory) {
    const entries = await fs.readdir(directory);
    const modules = {};

    for (const entry of entries) {
        const modulePath = path.join(directory, entry);
        const extension = path.extname(entry);
        const name = path.basename(entry, extension);

        if (extension === ".js") {
            modules[name] = await fs.readFile(modulePath, "utf8");
        } else if (extension === ".wasm") {
            modules[entry] = {
                binary: await fs.readFile(modulePath, "base64")
            };
        }
    }

    return modules;
}

function serverUrl(config) {
    const protocol = config.protocol ?? "https";
    const hostname = config.hostname ?? "screeps.com";
    const port = config.port ?? 443;
    const serverPath = config.path ?? "/";

    return `${protocol}://${hostname}:${port}${serverPath}`;
}

function isDirectRun() {
    return import.meta.url === pathToFileURL(process.argv[1]).href;
}
