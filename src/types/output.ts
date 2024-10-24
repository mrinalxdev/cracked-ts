export type OutputFormat = "json" | "ast" | "tokens";

export function parseOutputFormat(format: string): OutputFormat {
  const validFormats: OutputFormat[] = ["json", "ast", "tokens"];
  const normalizedFormat = format.toLowerCase() as OutputFormat;

  if (!validFormats.includes(normalizedFormat)) {
    throw new Error(
      `Invalid output format : ${format}. Valid formats are: ${validFormats.join(", ")}`
    );
  }

  return normalizedFormat;
}
