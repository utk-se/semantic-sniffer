/**
 * Abstract class SmellDetector.
 * Gee I wanna use types
 * Each instance should encompass a lang, possess a list of S-expressions
 */
class SmellDetector
{
    // pass in lang, editor buffer?
    constructor()
    {
        if (this.constructor == SmellDetector)
        {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    // pass textbuffer in constructor?
    // work similar to editor.scan
    // can we use parseTextBuffer?
    say()
    {
        throw new Error("Method 'say()' must be implemented.");
    }
    // TODO: feature, allow enabling /disabling of individual s-expressions in
    // as well as providing a description for settings
    // return https://flight-manual.atom.io/api/v1.53.0/Range/
}