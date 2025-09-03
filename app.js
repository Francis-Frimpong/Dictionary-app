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
      console.log(data);
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
