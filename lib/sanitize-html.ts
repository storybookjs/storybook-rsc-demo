import _sanitizeHtml from 'sanitize-html'

const allowedTags = _sanitizeHtml.defaults.allowedTags.concat([
  'img',
  'h1',
  'h2',
  'h3',
])
const allowedAttributes = Object.assign(
  {},
  _sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src'],
  },
)

export const sanitizeHtml = (html: string) => {
  return _sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
  })
}
