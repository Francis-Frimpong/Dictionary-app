class DictionaryApi {
  constructor(resource) {
    this.resource = resource;
    this.word = word;
  }

  async getApi() {
    const response = await axios.get(this.resource);
    return response.data;
  }
}

class DictionaryApp {
  constructor() {}

  searchWord(word) {
    const searchData = new DictionaryApi(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    searchData.getApi().then((data) => {
      for (const answer of data) {
        console.log(answer);
        const resultsContainer = document.querySelector(".results-container");
        resultsContainer.innerHTML = "";

        // Create section
        const section = document.createElement("section");
        section.classList.add("results");

        // Word row
        const wordRow = document.createElement("div");
        wordRow.classList.add("word-row");

        const wordEl = document.createElement("h2");
        wordEl.classList.add("word");
        wordEl.textContent = answer.word;

        const audioBtn = document.createElement("button");
        audioBtn.classList.add("audio-btn");
        audioBtn.setAttribute("aria-label", "Play pronunciation");
        audioBtn.textContent = "🔊";
        audioBtn.addEventListener("click", () => {
          // Find the first valid audio file
          const validSound = answer.phonetics.find((sound) => sound.audio);

          if (validSound) {
            const audio = new Audio(validSound.audio);
            audio.play().catch((err) => console.error("Playback error:", err));
          } else {
            console.log("No audio available for this word.");
          }
        });

        wordRow.appendChild(wordEl);
        wordRow.appendChild(audioBtn);

        // Phonetic
        const phonetic = document.createElement("p");
        phonetic.classList.add("phonetic");
        phonetic.textContent = answer.phonetic;

        // Definition block
        const defBlock = document.createElement("div");
        defBlock.classList.add("definition-block");

        const defTitle = document.createElement("h3");
        defTitle.textContent = "Meaning";

        const ul = document.createElement("ul");
        answer.meanings.forEach((meaning) => {
          meaning.definitions.forEach((definition) => {
            const li = document.createElement("li");
            li.textContent = definition.definition;
            ul.appendChild(li);
          });
        });

        defBlock.appendChild(defTitle);
        defBlock.appendChild(ul);

        // Source
        const source = document.createElement("div");
        source.classList.add("source");
        source.innerHTML = `<p>Source: <a href="${answer.sourceUrls}" target="_blank">${answer.sourceUrls}</a></p>`;

        // Assemble section
        section.appendChild(wordRow);
        section.appendChild(phonetic);
        section.appendChild(defBlock);
        section.appendChild(source);

        // Append to container
        resultsContainer.appendChild(section);
      }
    });
  }

  changeFont() {
    word.style.fontFamily = fontSelect.value;
  }
}

const word = document.querySelector(".word");
const fontSelect = document.getElementById("font-style");

const searchField = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");

const dictionary = new DictionaryApp();

searchBtn.addEventListener("click", () => {
  dictionary.searchWord(searchField.value);
  searchField.value = "";
  // console.log("search", searchField.value);
});
fontSelect.addEventListener("input", () => dictionary.changeFont());

// const audio = new Audio(
//   "https://api.dictionaryapi.dev/media/pronunciations/en/audio-us.mp3"
// );

// audio.play();
