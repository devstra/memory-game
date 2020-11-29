let cardFlipCount = 0;
let firstCard = null;
let secondCard = null;
let correctCardMatches = 0;
let cards;
let grid = $(".grid-container");

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomImages = () => {
  let imageIndexes = new Set();
  do {
    imageIndexes.add(getRandomNumber(1, 51));
  } while (imageIndexes.size < 8);

  const array = Array.from(imageIndexes);

  return array.concat(array);
};

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
  const images = getRandomImages();
  const shuffled = shuffleImages(images);

  let cardList = "";
  for (let index = 0; index < images.length; index++) {
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
      "<div class='grid-card'><img class='card-image' src='images/icon-" +
      shuffled[index] +
      ".svg' /></div>";
  }
  grid.html(cardList);

  cards = $(".grid-card");

  // Add click listeners
  for (const card of cards) {
    $(card).click((e) => {
      e.preventDefault();

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
