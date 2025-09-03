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

const dictionary = new DictionaryApp();
dictionary.searchWord("software");
fontSelect.addEventListener("input", () => dictionary.changeFont());
