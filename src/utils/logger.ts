import chalk from "chalk";

export const logger = {
  debug: (message: string) => {
    if (process.env.DEBUG) {
      console.log(chalk.gray(`[DEBUG] ${message}`));
    }
  },

  info: (message: string) => {
    console.log(chalk.blue(`[INFO] ${message}`));
  },

  warn: (message: string) => {
    console.warn(chalk.yellow(`[WARN] ${message}`));
  },

  error: (message: string, error?: Error) => {
    console.error(chalk.red(`[ERROR] ${message}`));
    if (error?.stack && process.env.DEBUG) {
      console.error(chalk.gray(error.stack));
    }
  },
};

export function setupLogger() {
  if (process.env.NODE_ENV === "development") {
    process.env.DEBUG = "true";
  }
}
