let rg
let button

function setup() {
  noCanvas()

  rg = new RiGrammar()
  rg.loadFrom('/haiku/assets/grammar-en.json', grammarReady)

  function grammarReady() {
    console.log('ready')
  }

  button = createButton('generate')
  button.mousePressed(newHaiku)
}

function newHaiku() {
  const result = rg.expand()
  createP(result)
}
