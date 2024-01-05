export default [
`
type: object
`,
`
type: object
properties:
  firstName:
    type: string
    title: First name
`,
`
type: object
properties:
  firstName:
    type: string
    title: First name
  lastName:
    type: string
    title: Last name
`,
`
type: object
properties:
  firstName:
    type: string
    title: First name
    layout:
      cols: 6
  lastName:
    type: string
    title: Last name
    layout:
      cols: 6
`,
`
type: object
required:
  - firstName
  - lastName
properties:
  firstName:
    type: string
    title: First name
    layout:
      cols: 6
  lastName:
    type: string
    title: Last name
    layout:
      cols: 6
`,
`
type: object
properties:
  firstName:
    type: string
    title: First name
    layout:
      cols: 6
  lastName:
    type: string
    title: Last name
    layout:
      cols: 6
  bio:
    type: string
    title: Bio
    layout: markdown
`
]
