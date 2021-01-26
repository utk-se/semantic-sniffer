'use babel';

const Parser = require('tree-sitter');
const {Query, QueryCursor} = Parser;
const CodeSmell = require('./detector/code-smell');
import Range from 'atom';
export default class SmellDetector
{
    // lang should be a tree sitter module for the desired language
    constructor(lang)
    {
        this.parser = new Parser();
        this.parser.setLanguage(lang);
        this.lang = lang;
        this.code_smells = [];
        this.tree = null;

        // smell A
        // TODO: ENHANCEMENT: enable code smells to be enabled/disabled via settings.
        this.code_smells.push(
          new CodeSmell('smell-a',
            `(if_statement condition: (parenthesized_expression
              (assignment_expression) @smell-a
            ))`,
            "Confusing assignment operator (=) with comparison operator (==)"
          )
        );

        this.code_smells.push(
          new CodeSmell('smell-b',
            '(binary_expression operator: \"==\" @smell_b (string_literal))',
            'Use of == instead of .equals to compare strings.'));

        var s_expr_d = '(if_statement condition: (parenthesized_expression (binary_expression operator: [\"&\" \"|\"]) @smell_d))';
        var s_expr_d_2 = '(while_statement condition: (parenthesized_expression (binary_expression operator: [\"&\" \"|\"]) @smell_d))'

        this.code_smells.push(
          new CodeSmell('smell-d',
            s_expr_d + s_expr_d_2,
            'Confusing short circuit logic operators (&&, ||) with bitwise operators (|, &)'
          )
        );

        // construct query from s_expressions
        var query_string = "";
        for (var code_smell of this.code_smells) {
          query_string += code_smell.s_expr;
          query_string += " ";
        }
        this.query = new Query(this.lang, query_string);
    }

    updateTree(textBuffer)
    {
        // reuse existing tree
        // TODO: ENHANCEMENT: use GetchangedRanges to check for changed ranges first
        // hasError
        // if(this.tree === null) {
        //     this.tree = this.parser.parseTextBufferSync(textBuffer);
        // } else {
        //   this.tree = this.parser.parseTextBufferSync(textBuffer, this.tree);
        // }
        this.tree = this.parser.parseTextBufferSync(textBuffer);

    }

    // return Type, Range https://flight-manual.atom.io/api/v1.53.0/Range/
    getRanges(treeNode)
    {
        // TODO: ENHANCEMENT: specify start and end to query.matches
        // TODO: ENHANCEMENT: yield matches (pending tree-sitter node bindings support
        // for QueryCursor
        let matches = this.query.matches(treeNode);

        // add range instance to results
        for (var pattern_match of matches) {
          for (var capture of pattern_match['captures']) {
            let coords = [
              [capture['node']['startPosition']['row'], capture['node']['startPosition']['column']],
              [capture['node']['endPosition']['row'], capture['node']['endPosition']['column']]
            ];
            // console.log('Match coords: ' + coords);
            capture['range'] = coords;
        }
      }
        return matches;
    }
}
