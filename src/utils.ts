import {extname} from 'path'

export function detectLanguage(filePath : string): string {

    const extension = extname(filePath).toLowerCase();

    const languageMap : { [key : string]  : string } = {
        '.py' : 'python',
        '.js' : 'javascript'
    }

    const language = languageMap[extension]

    return language
}