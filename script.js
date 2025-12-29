const randomJokeUrl = "https://api.chucknorris.io/jokes/random";
const categoriesUrl = "https://api.chucknorris.io/jokes/categories";

const randomJokeBtn = document.getElementById("random-joke");
const errorPara = document.querySelector(".error");
const jokePara = document.querySelector(".joke");
const categoryList = document.getElementById("categories");
const generateJokeBtn = document.getElementById("generate-joke");

const getCategories = async function () {
  errorPara.style.display = "none";

  try {
    const response = await fetch(categoriesUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    result.map((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.innerHTML = category;
      categoryList.appendChild(option);
    });
  } catch (error) {
    console.error(error.message);
    errorPara.innerHTML = "Something went wrong, categories not found 😢";
    errorPara.style.display = "block";
  }
};

const getRandomJoke = async function () {
  jokePara.innerHTML = "";
  errorPara.style.display = "none";

  try {
    const response = await fetch(randomJokeUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    jokePara.innerHTML = result.value;
  } catch (error) {
    console.error(error.message);
    errorPara.innerHTML = "Something went wrong 😢";
    errorPara.style.display = "block";
  }
};

const getJokeByCategory = async function () {
  const category = document.querySelector("input[list=categories]").value;
  const categoryJokeUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
  jokePara.innerHTML = "";
  errorPara.style.display = "none";

  try {
    const response = await fetch(categoryJokeUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    jokePara.innerHTML = result.value;
  } catch (error) {
    console.error(error.message);
    if (!category) {
      errorPara.innerHTML =
        "Please select category or click on random joke button.";
      errorPara.style.display = "block";
    } else {
      errorPara.innerHTML = "Something went wrong 😢";
      errorPara.style.display = "block";
    }
  }
};

getCategories();
randomJokeBtn.addEventListener("click", getRandomJoke);
generateJokeBtn.addEventListener("click", getJokeByCategory);
document
  .querySelector("input[list=categories]")
  .addEventListener("click", (e) => {
    e.target.value = "";
  });
