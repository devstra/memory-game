let cardFlipCount = 0;
let firstCard = null;
let secondCard = null;
let correctCardMatches = 0;
const images = [
  "images/naruto.png",
  "images/naruto.png",
  "images/drstone.jpg",
  "images/drstone.jpg",
  "images/kilua.png",
  "images/kilua.png",
  "images/meliodas.png",
  "images/meliodas.png",
  "images/kakashi.jpg",
  "images/kakashi.jpg",
  "images/levi.jpg",
  "images/levi.jpg",
  "images/mikasa.png",
  "images/mikasa.png",
  "images/saitama.jpg",
  "images/saitama.jpg",
];
let cards;
let grid = $(".grid-container");

const shuffleImages = (img) => {
  let currentIndex = img.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = img[currentIndex];
    img[currentIndex] = img[randomIndex];
    img[randomIndex] = temporaryValue;
  }
  return img;
};

const closeOpenCards = () => {
  // temporarily disable click here

  setTimeout(() => {
    $(firstCard).removeClass("disabled open");
    $(secondCard).removeClass("disabled open");

    firstCard = null;
    secondCard = null;
  }, 1000);
};

const disableCard = (card) => {
  $(card).click(() => {
    return;
  });
};

const isGameWon = () => {
  return correctCardMatches == 8;
};

const checkCards = () => {
  if (
    $(firstCard).children("img").attr("src") ===
    $(secondCard).children("img").attr("src")
  ) {
    // disable correctly matched cards
    disableCard(firstCard);
    disableCard(secondCard);

    // on incrémente le score
    correctCardMatches += 1;

    // reset selected cards
    firstCard = null;
    secondCard = null;
  } else {
    closeOpenCards();
  }

  if (isGameWon()) {
    $("#won-flip-count").text(cardFlipCount);
    $(".modal").removeClass("invisible");
  }
};

const initCards = () => {
  const shuffled = shuffleImages(images);

  let cardList = "";
  for (let index = 0; index < 16; index++) {
    if (index % 4 == 0) {
      switch (index) {
        case 0:
          cardList += "<div class='grid-row'>";
          break;
        case 16:
          cardList += "</div>";
          break;
        default:
          cardList += "</div><div class='grid-row'>";
          break;
      }
    }
    cardList +=
      "<div class='grid-card'><img class='card-image' src=" +
      shuffled[index] +
      " /></div>";
  }
  grid.html(cardList);

  cards = $(".grid-card");

  // Add click listeners
  for (const card of cards) {
    $(card).click((e) => {
      e.preventDefault();

      console.log("clicked");
      // Block clicks on disabled cards
      if ($(card).hasClass("disabled")) {
        return;
      }

      cardFlipCount += 1;
      $("#card-flip-count").text(cardFlipCount);
      $(card).toggleClass("open");
      $(card).toggleClass("disabled");

      if (firstCard == null) {
        firstCard = $(card);
      } else {
        secondCard = $(card);

        checkCards();
      }
    });
  }
};

const resetGame = () => {
  $(".modal").addClass("invisible");
  $("#card-flip-count").text("0");

  // Reset variables
  cardFlipCount = 0;
  firstCard = null;
  secondCard = null;
  correctCardMatches = 0;

  cards.removeClass("disabled open");

  // Remove event handers
  cards.unbind("click");

  // Remove previous images from DOM
  cards.empty();

  initCards();
};

window.onload = () => {
  initCards();
  $("#reset-btn").click(resetGame);
};
