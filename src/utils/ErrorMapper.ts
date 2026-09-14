/* eslint-disable */
import { SourceMapConsumer } from "source-map";

function escapeHtml(value: string | undefined): string {
    return (value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export class ErrorMapper {
    private static _consumer?: SourceMapConsumer;

    public static get consumer(): SourceMapConsumer {
        if (this._consumer == null) {
            this._consumer = new SourceMapConsumer(require("main.js.map"));
        }

        return this._consumer;
    }

    public static cache: { [key: string]: string } = {};

    public static sourceMappedStackTrace(error: Error | string): string {
        const stack = error instanceof Error ? (error.stack as string) : error;

        if (Object.prototype.hasOwnProperty.call(this.cache, stack)) {
            return this.cache[stack];
        }

        const regex = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm;
        let match: RegExpExecArray | null;
        let outputStack = error.toString();

        while ((match = regex.exec(stack))) {
            if (match[2] === "main") {
                const position = this.consumer.originalPositionFor({
                    column: parseInt(match[4], 10),
                    line: parseInt(match[3], 10)
                });

                if (position.line != null) {
                    if (position.name) {
                        outputStack += `\n    at ${position.name} (${position.source}:${position.line}:${position.column})`;
                    } else if (match[1]) {
                        outputStack += `\n    at ${match[1]} (${position.source}:${position.line}:${position.column})`;
                    } else {
                        outputStack += `\n    at ${position.source}:${position.line}:${position.column}`;
                    }
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        this.cache[stack] = outputStack;
        return outputStack;
    }

    public static wrapLoop(loop: () => void): () => void {
        return () => {
            try {
                loop();
            } catch (error) {
                if (error instanceof Error) {
                    if ("sim" in Game.rooms) {
                        const message = "Source maps do not work in the simulator - displaying original error";
                        console.log(`<span style='color:red'>${message}<br>${escapeHtml(error.stack)}</span>`);
                    } else {
                        console.log(`<span style='color:red'>${escapeHtml(this.sourceMappedStackTrace(error))}</span>`);
                    }
                } else {
                    throw error;
                }
            }
        };
    }
}
