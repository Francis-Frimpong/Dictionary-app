class DictionaryApi {
  constructor(resource) {
    this.resource = resource;
  }

  async getApi() {
    const response = await axios.get(this.resource);
    return response.data;
  }
}

class DictionaryApp {
  constructor() {
    this.fontToChange = [];
    this.fontSelect = document.getElementById("font-style");

    this.searchField = document.querySelector("input");
    this.searchBtn = document.querySelector(".search-btn");
  }

  searchWord(word) {
    const searchData = new DictionaryApi(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    searchData.getApi().then((data) => {
      for (const answer of data) {
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

        this.fontToChange = [wordEl, ul, source, defTitle];
      }
    });
  }

  changeFont() {
    for (const targetFont of this.fontToChange) {
      targetFont.style.fontFamily = this.fontSelect.value;
    }
  }

  addEventListeners() {
    this.fontSelect.addEventListener("click", () => this.changeFont());

    this.searchBtn.addEventListener("click", () => {
      this.searchWord(this.searchField.value);
      this.searchField.value = "";
    });
  }
}

const dictionary = new DictionaryApp();
dictionary.addEventListeners();
