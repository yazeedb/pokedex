export default Array(200)
  .fill()
  .map((_, index) => ({
    id: index + 1,
    name: '',
    spriteUrl: '',
    types: [],
    skeleton: true
  }));
