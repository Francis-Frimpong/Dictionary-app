class DictionaryApi {
  constructor(resource, word) {
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

  searchWord() {}

  changeFont() {
    word.style.fontFamily = fontSelect.value;
  }
}

const word = document.querySelector(".word");
const fontSelect = document.getElementById("font-style");

const dictionary = new DictionaryApp();
fontSelect.addEventListener("input", () => dictionary.changeFont());
