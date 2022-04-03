let rg
let button

function setup() {
  noCanvas()

  rg = new RiGrammar()
  rg.loadFrom('grammar.json', grammarReady)

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
