function startWindowSequence() {
  let win = window.open("", "", "width=410,height=410");
  setTimeout(() => {
    win.resizeTo(500, 500);
    setTimeout(() => {
      win.moveTo(200, 200);
      setTimeout(() => {
        win.close();
      }, 2000);
    }, 2000);
  }, 2000);
}

function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function updateAnalogClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const degree = seconds * 6;
  document.getElementById("secondHand").style.transform = `rotate(${degree}deg)`;
}
setInterval(updateAnalogClock, 1000);
updateAnalogClock();

const suits = ['♠', '♥', '♦', '♣'];
const values = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function getRandomCard() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return value + suit;
}

function dealCards() {
  const p1 = document.getElementById("player1");
  const p2 = document.getElementById("player2");
  p1.innerHTML = "<h3>Гравець 1</h3>";
  p2.innerHTML = "<h3>Гравець 2</h3>";

  for (let i = 0; i < 6; i++) {
    const card1 = document.createElement("div");
    card1.className = "card";
    card1.textContent = getRandomCard();
    p1.appendChild(card1);

    const card2 = document.createElement("div");
    card2.className = "card";
    card2.textContent = getRandomCard();
    p2.appendChild(card2);
  }
}
