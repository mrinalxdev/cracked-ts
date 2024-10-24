import { OutputFormat } from "./output";

export interface ProcessOptions {
    format : OutputFormat;
    pretty?: boolean;
    verbose?: boolean;
    outputFile?: string;
}