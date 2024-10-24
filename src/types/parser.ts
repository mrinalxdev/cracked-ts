export interface Position {
    row : number;
    column : number
}

export interface ParserNode {
    type : string
    text : string
    startPosition : Position;
    endPosition : Position
    children?: ParserNode[];
}

export interface ParserMetaData {
    parseTime : number
    nodeCount : number
}

export interface ParserResult {
    language : string
    ast : ParserNode
    metadata : ParserMetaData
}