const memeContainer = document.getElementById("memeContainer");
const searchInput = document.getElementById("searchInput");

async function fetchMemes() {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();

    if (data.success) {
      displayMemes(data.data.memes);
    } else {
      memeContainer.innerHTML = "<p>Failed to load memes. Please try again later.</p>";
    }
  } catch (error) {
    console.error("Error fetching memes:", error);
    memeContainer.innerHTML = "<p>Error loading memes. Please check your internet connection.</p>";
  }
}

function displayMemes(memes) {
  memeContainer.innerHTML = "";
  memes.forEach((meme) => {
    const memeCard = document.createElement("div");
    memeCard.className = "meme-card";
    memeCard.innerHTML = `
      <img src="${meme.url}" alt="${meme.name}">
      <h3>${meme.name}</h3>
    `;
    memeContainer.appendChild(memeCard);
  });
}

function filterMemes() {
  const searchTerm = searchInput.value.toLowerCase();
  const memeCards = document.querySelectorAll(".meme-card");
  memeCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(searchTerm) ? "block" : "none";
  });
}

fetchMemes();
