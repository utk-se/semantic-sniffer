# Development Criteria for SemanticSniffer

SemanticSniffer is an interrogative debugger developed with novice programmers in mind. Past research suggests that bugs related to misconceptions about code behavior are highly time consuming. SemanticSniffer helps in two ways: Scanning for code that is likely to misbehave, and eliciting information about program behavior from novice programmers to address their misconceptions.

## Target Audiences

## Design Considerations (Sniffer)
* Pre-configured for out of the box applicability
* Minimal editor footprint unless brought into focus (negotiable interruptions)
* Respond to user input within approximately 100ms and without blocking other aspects
* API allowing one or more 'sniffer services' to process editor
* sniffer correctly predict >90% of positive cases (and <10% false positives).
* Users can configure configure sniffer to ignore an instance of a false positive or based on a pattern
<!-- too many false positives will frustrate developers -->

* The sniffer should update with any changes being made to the active editor.
* The sniffer should automatically analyze code in the active editor

### Stretch Goals (Sniffer)
* Support most programming languages
* Installation should be encompassed by an editor package or otherwise be extremely straightforward
* In addition to detection of misbehaving code, provide suggested refactoring
* Associate a misconception with an underlying class of misconception

## Design Considerations (Inquisitive Code Editor)
* If there is a detected probable code misconception, a user can interact with a
hint to access questions related to that code region
* The questions should be designed in such a way that answering the question requires a correct
conceptual understanding of the code block
* The questions posed should have a definite (correct or incorrect) answer.
  * Thus, if the programmer is incorrect, they will have a concrete example of the program not behaving as expected.
* The question should address regions of code that are large/interdependent enough to present adequate complexity
* The question should address a region of code small enough that it is manageable for the programmer to understand / address and directs attention to the root cause of the problem
* Answering a question should require minimal input from the user.
  * The time between a question being posed and getting feedback should be minimized. Ie, a short answer question that requires typing/pasting the content of a lengthy list creates needless tedium. Multiple choice would be better.
* Questions shouldn't give away the underlying problem in the statement
  * Going for 'surprise, explain, reward'
  * This would indicate a syntax error or simple mistake that can quickly resolved with linters or compiler feedback. Trivial questions might frustrate students.
* Instantaneous feedback on addressing questions
* Within a finite set of classes of questions, pose the most relevant questions first

### Stretch Goals (Inquisitive Code Editor)
* Support and extensibility for numerous languages

## Out Of Scope
Out of scope features are features that might be useful, but aren't in the core set of features currently planned.

## MOCKUP




## Stretch Goals (Inquisitive Code Editor)
*
