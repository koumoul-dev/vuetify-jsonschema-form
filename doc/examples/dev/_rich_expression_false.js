const id = 'rich-expression-array'

const title = 'Rich expression Array'

const description = `
    Check if in operator work to display input.
`

const schema = {
    type: 'object',
    properties: {
        stringProp: { type: 'string', title: `I'm another required string`, },
        conditionnalProp: {
            type: "string", title: "I'm here if  Hello is in arrayProp", "x-if": "'World' == modelRoot.stringProp",
        }
    }
}

const model = {
    stringProp: "Hello"
}

const options = {
    evalMethod: "evalExpr",
    editMode: 'inline'
}

const test = (wrapper) => {
    const properties = wrapper.findAll('.vjsf-property');
    expect(properties).toHaveLength(2);
    expect(wrapper.vm.valid).toBe(true)
}


export default { id, title, description, schema, model, options, test }
