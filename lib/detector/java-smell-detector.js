const Parser = require('tree-sitter');
const Java = require('tree-sitter-java');
const SmellDetector = require('./smell-detector')
const {Query, QueryCursor} = Parser

const parser = new Parser();
parser.setLanguage(Java);

// goal: match expressions, return range
// feature: query syntax using s-expression
var tree = parser.parse(test_src);
// on edit update the tree
console.log(tree.rootNode.toString());
console.log("Querying");
const s_exp1 = `(if_statement condition: (parenthesized_expression
    (assignment_expression) @test-capture
    ))`;
const s_exp2 = "(identifier)";
const query = new Query(Java, s_exp1 + s_exp2);
const matches = query.matches(tree.rootNode);
console.log(matches)
console.log(matches[0].captures);
// TODO: use parser only on applicable langs

class JavaSmellDetector extends SmellDetector
{
    constructor(textBuffer)
    {
        // is textbuffer a reference or nah
        this.tree = parser.parseTextBufferSync(textBuffer);

        // TODO: finish populating this
        this.s_expressions = {};
    }

    updateTree(textBuffer)
    {
        // reuse existing tree
        this.tree = parser.parseTextBufferSync(textBuffer, this.tree);
    }
    // return https://flight-manual.atom.io/api/v1.53.0/Range/
    // queryresult is an iterator
    getRanges(queryResult)
    {
    }
}