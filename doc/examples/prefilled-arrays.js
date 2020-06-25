const id = 'prefilled-arrays'

const title = 'Prefilled arrays'

const description = `Arrays can be initialized using a list of values. In this case elements can be edited and sorted but it is not possible to add or remove them.

Objects used to initialize the array are fetched using similar methods as for select fields (fromData, fromUrl).`

const schema = {
  type: 'object',
  properties: {
    filledArray: {
      type: 'array',
      title: `I'm an array filled by HTTP request`,
      'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets?status=finalized&size=4&select=href,title&owner={context.owner.type}:{context.owner.id}',
      'x-itemsProp': 'results',
      'x-itemTitle': 'title',
      'x-itemKey': 'href',
      'x-display': 'list',
      items: {
        type: 'object',
        properties: {
          href: { type: 'string', 'x-display': 'hidden' },
          title: { type: 'string', 'x-display': 'hidden' },
          additionalProp: { type: 'string', title: `I'm an additional field` },
          icon: {
            type: 'object',
            title: 'Icone',
            'x-fromUrl': 'https://koumoul.com/s/data-fair/api/v1/datasets/icons-mdi-latest/lines?q={q}',
            'x-itemKey': 'name',
            'x-itemTitle': 'name',
            'x-itemIcon': 'svg',
            'x-itemsProp': 'results',
            properties: {
              name: {
                type: 'string'
              },
              svg: {
                type: 'string'
              }
            },
            default: {
              name: 'map-marker',
              svg: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-map-marker" width="24" height="24" viewBox="0 0 24 24"><path d="M12,11.5C10.62,11.5 9.5,10.38 9.5,9C9.5,7.62 10.62,6.5 12,6.5C13.38,6.5 14.5,7.62 14.5,9C14.5,10.38 13.38,11.5 12,11.5M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" /></svg>'
            }
          }
        }
      }
    }
  }
}

const model = {}

const options = { context: { owner: { type: 'organization', id: '5a5dc47163ebd4a6f438589b' } } }

export default { id, title, description, schema, model, options }
