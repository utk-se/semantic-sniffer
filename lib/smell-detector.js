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

        // smell A
        this.code_smells.push(
          new CodeSmell('smell-a',
            `(if_statement condition: (parenthesized_expression
              (assignment_expression) @smell-a
            ))`,
            "Confusing assignment operator (=) with comparison operator (==)"
          )
        );

        s_exprs = [];
        // TODO: construct query from s_expressions
        for (code_smell of this.code_smells) {
          s_exprs += code_smell.s_expr;
        }
        query_string = s_exprs.join(" ")
        this.query = new Query(this.lang, query_string);
    }

    updateTree(textBuffer)
    {
        // reuse existing tree
        // TODO: ENHANCEMENT: use GetchangedRanges to check for changed ranges first
        // hasError
        if(this.tree === null) {
            this.tree = parser.parseTextBufferSync(textBuffer);
        } else {

          this.tree = parser.parseTextBufferSync(textBuffer, this.tree);
        }
    }

    // return Type, Range https://flight-manual.atom.io/api/v1.53.0/Range/
    getRanges(treeNode)
    {
        // TODO: ENHANCEMENT: specify start and end to query.matches
        // TODO: ENHANCEMENT: yield matches (pending tree-sitter node bindings support
        // for QueryCursor
        let matches = this.query.matches(treeNode);

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
