import { ParserResult } from "../types/parser";
import { OutputFormat } from "../types/output";
import { CodeParserError } from "../errors/CodeParserErrors";

export function transformOutput(result: ParserResult, format: OutputFormat) {
  switch (format) {
    case "json":
      return result;

    case "ast":
      return result.ast;

    case "tokens":
      return extractTokens(result.ast);

    default:
      throw new CodeParserError(`Unsupported output format : ${format}`);
  }
}

function extractTokens(ast: any): string[] {
  const tokens: string[] = [];

  function traverse(node: any) {
    if (
      node.type === "identifier" ||
      node.type === "string" ||
      node.type === "number"
    ) {
      tokens.push(node.text);
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  traverse(ast);
  return tokens;
}
