import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { Logger } from "@/logging/Logger";

describe("Logger", () => {
    let logSpy: Mock;

    beforeEach(() => {
        logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    it("should log all messages when level is set to debug", () => {
        const logger = new Logger("debug");

        logger.debug("Debug message");
        logger.info("Info message");
        logger.warning("Warning message");
        logger.error("Error message");

        expect(logSpy).toHaveBeenCalledTimes(4);
    });

    it("should log info, warning, and error messages when level is set to info", () => {
        const logger = new Logger("info");

        logger.debug("Debug message");
        logger.info("Info message");
        logger.warning("Warning message");
        logger.error("Error message");

        expect(logSpy).toHaveBeenCalledTimes(3);
    });

    it("should log warning and error messages when level is set to warning", () => {
        const logger = new Logger("warning");

        logger.debug("Debug message");
        logger.info("Info message");
        logger.warning("Warning message");
        logger.error("Error message");

        expect(logSpy).toHaveBeenCalledTimes(2);
    });

    it("should log only error messages when level is set to error", () => {
        const logger = new Logger("error");

        logger.debug("Debug message");
        logger.info("Info message");
        logger.warning("Warning message");
        logger.error("Error message");

        expect(logSpy).toHaveBeenCalledTimes(1);
    });
});
