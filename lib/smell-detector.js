const Parser = require('tree-sitter');
const {Query, QueryCursor} = Parser;
const CodeSmell = require('./code-smell');
import Range from 'atom';

class SmellDetector
{
    // lang should be a tree sitter module for the desired language
    constructor(lang, textBuffer)
    {
        if
        this.parser = new Parser();
        this.parser.setLanguage(lang);
        this.lang = lang;
        // is textbuffer a reference or nah
        // TODO:
        this.code_smells = [];

        this.code_smells.push(new CodeSmell("Confusing assignment operator (=) with comparison operator (==)",
                                            `(if_statement condition: (parenthesized_expression
    (assignment_expression) @test-capture
    ))`));
        // perform initial tree parsing
    }

    updateTree(textBuffer)
    {
        // reuse existing tree
        // TODO: use GetchangedRanges to check for changed ranges first
        // hasError
        this.tree = parser.parseTextBufferSync(textBuffer, this.tree);
    }
    // return Type, Range https://flight-manual.atom.io/api/v1.53.0/Range/
    // queryresult is an iterator
    // TODO: Determine if a larger query is better than several smaller calls
    getRanges(treeNode, queryResult)
    {
        // TODO: construct query from s_expressions
        let query_string = "";
        this.code_smells.forEach(element => {
            if (element.enabled == true)
            {
                query += element.s_exp;
                query += " ";
            }
        });
        let query = new Query(this.lang, query_string);

        // TODO: retrieve results of query and yield results
        let matches = query.matches(treeNode);
    }
}
