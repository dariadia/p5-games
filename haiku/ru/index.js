let rg
let button
let paragraph

function setup() {
  noCanvas()

  rg = new RiGrammar()
  rg.loadFrom('/haiku/assets/grammar-ru.json')

  button = createButton('generate')
  button.class('block my-8 mx-auto bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded')
  button.mousePressed(newHaiku)
}

function newHaiku() {
  const result = rg.expand()
  paragraph = createP(result)
  paragraph.class('my-4 mx-auto block text-center text-white bg-indigo-700 px-6 py-4 max-w-sm rounded overflow-hidden shadow-lg')
}
