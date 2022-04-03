let rg
let button

function setup() {
  noCanvas()

  rg = new RiGrammar()
  rg.loadFrom('/haiku/assets/grammar-en.json')

  button = createButton('generate')
  button.class('grid')
  button.mousePressed(newHaiku)
}

function newHaiku() {
  const result = rg.expand()
  createP(result)
}
