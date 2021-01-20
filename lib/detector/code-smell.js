// Container for fields associated with a code smell
module.exports = class CodeSmell
{
    // s expression for tree query
    constructor(name, s_expr, description, automatic_fix = null, question = null, enabled = true)
    {
        this.name = name;
        this.s_expr = s_expr;
        this.automatic_fix = automatic_fix;
        // TODO: impl this will be a view
        this.question = question;
        // this will be used to enable/disable smells in the atom config
        this.enabled = enabled;
        this.lang = null;
        this.description = description;
    }

    serialize(){
      return JSON.stringify(this);
    }

    // TODO: Implement
    deserialize(json) {
      return this;
    }
}
