import Parser from "tree-sitter";
import { getLanguageConfig } from "../languages";
import { ParserNode, ParserResult } from "../types/parser";
import { CodeParserError } from "../errors/CodeParserErrors";
import { logger } from "../utils/logger";

export class PsCore {
  private parser: any;
  private language: string;

  constructor(language: string) {
    this.language = language;
    this.parser = new Parser();

    try {
      const languageConfig = getLanguageConfig(language);
      this.parser.setLanguage(languageConfig);
      logger.debug(`Parser intialized for language : ${language}`);
    } catch (error) {
      throw new CodeParserError(
        `Failed to initialize parser for language : ${language}`
      );
    }
  }

  async parse(code: string): Promise<ParserResult> {
    logger.debug("Starting parse operation");

    try {
      const tree = this.parser.parse(code);
      const ast = this.transformAST(tree.rootNode);

      return {
        language: this.language,
        ast,
        metadata: {
          parseTime: tree.getEditTime(),
          nodeCount: this.countNodes(tree.rootNode),
        },
      };
    } catch (error) {
      throw new CodeParserError("Parse operation failed", error as Error);
    }
  }

  private transformAST(node: any): ParserNode {
    const result: ParserNode = {
      type: node.type,
      text: node.text,
      startPosition: {
        row: node.startPosition.row,
        column: node.startPosition.column,
      },
      endPosition: {
        row: node.endPosition.row,
        column: node.endPosition.column,
      },
    };

    if (node.children.length > 0) {
      result.children = node.children.map((child: any) =>
        this.transformAST(child)
      );
    }

    return result;
  }

  private countNodes(node: any): number {
    let count = 1;

    for (const child of node.children) {
      count += this.countNodes(child);
    }

    return count;
  }
}
