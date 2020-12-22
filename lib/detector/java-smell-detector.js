const Parser = require('tree-sitter');
const Java = require('tree-sitter-java');
const SmellDetector = require('./smell-detector');
const {Query, QueryCursor} = Parser;
const CodeSmell = require('./code-smell');
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

import Range from 'atom';

class JavaSmellDetector extends SmellDetector
{

    constructor(textBuffer)
    {
        this.parser = new Parser();
        this.parser.setLanguage('Java');
        // is textbuffer a reference or nah
        this.tree = parser.parseTextBufferSync(textBuffer);

        // TODO:
        this.code_smells = [];

        this.code_smells.push(new CodeSmell("Confusing assignment operator (=) with comparison operator (==)",
                                            `(if_statement condition: (parenthesized_expression
    (assignment_expression) @test-capture
    ))`));
    }

    updateTree(textBuffer)
    {
        // reuse existing tree
        this.tree = parser.parseTextBufferSync(textBuffer, this.tree);
    }
    // return Type, Range https://flight-manual.atom.io/api/v1.53.0/Range/
    // queryresult is an iterator
    // TODO: can we assume that query occurs from base of tree?
    getRanges(queryResult)
    {
        // TODO: construct query from s_expressions
        let query = "";
        this.code_smells.forEach(element => {
            query += element.s_exp;
        });
    }
}