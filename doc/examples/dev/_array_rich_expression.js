const id = 'rich-expression-array'

const title = 'Rich expression Array'

const description = `
    Check if in operator work to display input.
`

const schema = {
    type: 'object',
    properties: {
        arrayProp: { type: 'string', title: `I'm another required string`, enum: ["Hello", "World"] },
        conditionnalProp: {
            type: "string", title: "I'm here if  Hello is in arrayProp", "x-if": "'Hello' in modelRoot.arrayProp",
        }
    }
}

const model = {
    arrayProp: ["Hello"]
}

const options = {
    editMode: 'inline'
}

const test = (wrapper) => {
    const properties = wrapper.findAll('.vjsf-property');
    expect(properties).toHaveLength(3);
    expect(wrapper.vm.valid).toBe(true)
}


export default { id, title, description, schema, model, options, test }
