import { readFileSync, writeFile, writeFileSync } from "fs";
import { PsCore } from "./parser";
import { detectLanguage } from "../utils/language-detector";
import { ProcessOptions } from "../types/options";
import { CodeParserError } from "../errors/CodeParserErrors";
import { logger } from "../utils/logger";
import { transformOutput } from "../transformers";

export async function processFile(filePath: string, options: ProcessOptions) {
  logger.debug(`Process file : ${filePath}`);

  try {
    const code = readFileSync(filePath, "utf-8");
    const language = detectLanguage(filePath);

    logger.info(`Detected language : ${language}`);

    const parser = new PsCore(language);
    const ast = await parser.parse(code);

    const result = transformOutput(ast, options.format);

    if (options.outputFile) {
      writeFileSync(
        options.outputFile,
        options.pretty
          ? JSON.stringify(result, null, 2)
          : JSON.stringify(result)
      );
      logger.info(`Output written to : ${options.outputFile}`)
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new CodeParserError(
        `Failed to process file : ${error.message}`,
        error
      );
    }
    throw error;
  }
}
