import { extname } from "path";
import { getSupportedLanguages } from "../languages";
import { CodeParserError } from "../errors/CodeParserErrors";


const extensionMap : Record<string, string> = {
    '.py' : 'python',
    '.js' : 'javascript'
}

export function detectLanguage(filePath : string) : string {
    const extension = extname(filePath).toLowerCase()
    const language = extensionMap[extension]

    if (!language){
        const supported  = getSupportedLanguages().join(', ');
        throw new CodeParserError(`Unsupported file extension : ${extension}. Supported languages: ${supported}`);
    }

    return language
}