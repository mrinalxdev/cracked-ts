import Parser from "tree-sitter";
import Python from "tree-sitter-python";
import JavaScript from "tree-sitter-javascript";

export class Ps {
  private parser: any;

  constructor(language: string) {
    this.parser = new Parser();

    switch (language) {
      case "python":
        this.parser.setLanguage(Python);
        break;
      case "javascript":
        this.parser.setLanguage(JavaScript);
        break;
      default:
        throw new Error(`Unsupported language : ${language}`);
    }
  }

  parse(code: string) {
    const tree = this.parser.parse(code);
    return this.transformToJson(tree.rootNode);
  }

  private transformToJson(node: any) {
    const result: any = {
      type: node.type,
      text: node.text,
      startPosition: node.startPosition,
      endPosition: node.endPosition,
    };

    if (node.children.length > 0) {
      result.children = node.children.map((child: any) =>
        this.transformToJson(child)
      );
    }

    return result;
  }
}
