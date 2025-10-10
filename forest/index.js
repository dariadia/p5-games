const backgroundColour = '#1A202C'
let rainbow
let pooratNaLes
let dragons
let crowander
let monster
let giant
let male
let donkey

function preload() {
  rainbow = loadSound('/forest/assets/rainbow.mp3');
  pooratNaLes = loadSound('/forest/assets/poorat-na-les.mp3');
  dragons = loadSound('/forest/assets/dragons.mp3');
  crowander = loadSound('/forest/assets/crowander.mp3');
  monster = loadSound('/forest/assets/monster.mp3');
  giant = loadSound('/forest/assets/giant.mp3');
  male = loadSound('/forest/assets/male.mp3');
  donkey = loadSound('/forest/assets/donkey.mp3');
  e1e49291a7844340 = loadSound('/forest/assets/1e49291a7844340.mp3');
  e40b09bf27c4080f = loadSound('/forest/assets/40b09bf27c4080f.mp3');
  e30059a05b3d8075 = loadSound('/forest/assets/30059a05b3d8075.mp3');
  e966380ea11fdeec = loadSound('/forest/assets/966380ea11fdeec.mp3');
  eb04efbbb80a386d = loadSound('/forest/assets/b04efbbb80a386d.mp3');
  ebd74abc209d2a9d = loadSound('/forest/assets/bd74abc209d2a9d.mp3');
  eho_zvuk_au_auuu_echo_fx_echo_sound = loadSound('/forest/assets/eho-zvuk-au-auuu-echo-fx-echo-sound.mp3');
  gemshn_krik_devushki = loadSound('/forest/assets/gemshn-krik-devushki.mp3');
  krik_uzasa_boli_i_otcayaniya = loadSound('/forest/assets/krik-uzasa-boli-i-otcayaniya.mp3');
  kriki_i_mucheniya_lyudey_6 = loadSound('/forest/assets/kriki-i-mucheniya-lyudey-6.mp3');
  l9dr_krik_devushki = loadSound('/forest/assets/l9dr-krik-devushki.mp3');
  muzhskoj_krik = loadSound('/forest/assets/muzhskoj_krik.mp3');
  neizvestnyy_ispolnitel_a = loadSound('/forest/assets/neizvestnyy-ispolnitel-a.mp3');
  zvuk_krik_devushki = loadSound('/forest/assets/zvuk_-_krik_devushki.mp3');
  zvuk_muzhskoj_krik = loadSound('/forest/assets/zvuk_-_muzhskoj_krik.mp3');
  zvuki_ada_kriki_novorozhdennogo = loadSound('/forest/assets/zvuki-ada-kriki-novorozhdennogo.mp3');
  zvuki_dlya_dostavaniya_sosedey_nechelovecheskie_kriki = loadSound('/forest/assets/zvuki-dlya-dostavaniya-sosedey-nechelovecheskie-kriki.mp3');
  zvuki_dlya_montazha_kriki_achivochka = loadSound('/forest/assets/zvuki-dlya-montazha-kriki-achivochka.mp3');
  zvuki_kriki = loadSound('/forest/assets/zvuki-kriki.mp3');
  zvuki_revolyucii_kriki_tolpy = loadSound('/forest/assets/zvuki-revolyucii-kriki-tolpy.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(15);
  background(backgroundColour);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  fill('grey');
  text('Press enter to add a tree. Press keys so play sounds. Press backspace to delete all.', 30, 30);
}

function drawTree(x, y){
  push();
  translate(x, y);

  // Draw the shape as a series of vertices.
  beginShape();
  // Vertices of tree are defined relative to (0, 0) point
  vertex(0, -140);
  vertex(-40, -60);
  vertex(-20, -60);
  vertex(-80, 10);
  vertex(-40, 10);
  vertex(-110, 100);
  vertex(-20, 100);
  vertex(-20, 140);
  vertex(20, 140);
  vertex(20, 100);
  vertex(110, 100);
  vertex(40, 10);
  vertex(80, 10);
  vertex(20, -60);
  vertex(40, -60);
  endShape(CLOSE);

  pop();
}

function keyPressed() {
  const pressed = key.toLowerCase();

  if (keyCode === ENTER) {
    fill(random(140, 170), 100, random(50, 80));
    drawTree(random(windowWidth), random(windowWidth));
    return;
  }

  if (pressed === 'b') {
    background(backgroundColour);
    return;
  }
	
  const soundMap = {
    a: rainbow,
    s: pooratNaLes,
    d: dragons,
    f: crowander,
    g: monster,
    h: giant,
    j: male,
    k: donkey,
    l: e1e49291a7844340,
    q: e40b09bf27c4080f,
    w: e30059a05b3d8075,
    e: e966380ea11fdeec,
    r: eb04efbbb80a386d,
    t: ebd74abc209d2a9d,
    y: eho_zvuk_au_auuu_echo_fx_echo_sound,
    u: gemshn_krik_devushki,
    i: krik_uzasa_boli_i_otcayaniya,
    o: kriki_i_mucheniya_lyudey_6,
    p: l9dr_krik_devushki,
    z: muzhskoj_krik,
    x: neizvestnyy_ispolnitel_a,
    c: zvuk_krik_devushki,
    v: zvuk_muzhskoj_krik,
    b: zvuki_ada_kriki_novorozhdennogo,
    n: zvuki_dlya_dostavaniya_sosedey_nechelovecheskie_kriki,
    m: zvuki_dlya_montazha_kriki_achivochka,
    '1': zvuki_kriki,
    '2': zvuki_revolyucii_kriki_tolpy
  };

  const sound = soundMap[pressed];
  if (sound) {
    if (sound.isPlaying()) {
      sound.stop();
    } else {
      sound.play();
    }
  }
}
