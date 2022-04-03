let rg
let button

function setup() {
  noCanvas()

  rg = new RiGrammar()
  rg.loadFrom('/haiku/assets/grammar-en.json')

  button = createButton('generate')
  button.class('block my-8 mx-auto bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-500 rounded')
  button.mousePressed(newHaiku)
}

function newHaiku() {
  const result = rg.expand()
  createP(result)
}
