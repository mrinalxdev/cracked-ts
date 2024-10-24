import Python from "tree-sitter-python";
import JavaScript from "tree-sitter-javascript";
import { CodeParserError } from "../errors/CodeParserErrors";

const languages = {
  python: Python,
  javascript: JavaScript,
};

export function getLanguageConfig(language: string) {
  const config = languages[language.toLowerCase()];
  if (!config) {
    throw new CodeParserError(`Unsupported language : ${language}`);
  }
  return config;
}

export function getSupportedLanguages() : string[] {
    return Object.keys(languages);
}