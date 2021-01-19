const Parser = require('tree-sitter');
const {Query, QueryCursor} = Parser;
const CodeSmell = require('./code-smell');
import Range from 'atom';
import Point from 'atom';
class SmellDetector
{
    // lang should be a tree sitter module for the desired language
    constructor(lang)
    {
        this.parser = new Parser();
        this.parser.setLanguage(lang);
        this.lang = lang;
        // is textbuffer a reference or nah
        // TODO:
        this.code_smells = [];
        this.tree = null;

        this.code_smells.push(new CodeSmell("Confusing assignment operator (=) with comparison operator (==)",
                                            `(if_statement condition: (parenthesized_expression
    (assignment_expression) @smell-a
    ))`));


    }

    updateTree(textBuffer)
    {
        // reuse existing tree
        // TODO: use GetchangedRanges to check for changed ranges first
        // hasError
        if(this.tree === null) {
            this.tree = parser.parseTextBufferSync(textBuffer);
        } else {

          this.tree = parser.parseTextBufferSync(textBuffer, this.tree);
        }
    }
    // return Type, Range https://flight-manual.atom.io/api/v1.53.0/Range/
    // queryresult is an iterator
    // TODO: Determine if a larger query is better than several smaller calls
    getRanges(treeNode, queryResult)
    {
        // TODO: construct query from s_expressions
        let query_string = "";
        let query = new Query(this.lang, query_string);
        // TODO: specify start and end to query.matches
        // IMPROVEMENT: yield matches (pending tree-sitter node bindings support
        // for QueryCursor 
        let matches = query.matches(treeNode);

        // add range instance to results
        for (pattern_match of matches) {
          for (capture of pattern_match['captures'])
            capture['range'] = new Range(
              Point.fromObject(capture['node']['startPosition']),
              Point.fromObject(capture['node']['endPosition'])
            )
        }

        return matches;
    }
}
