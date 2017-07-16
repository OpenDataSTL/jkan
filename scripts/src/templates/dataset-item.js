export default (data) => (
`<dataset>
  <h4><a href="${data.url}">${data.title}</a></h4><p>
  ${data.notes || ''}
</p></dataset>`
)
