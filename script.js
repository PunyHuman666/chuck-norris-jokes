const randomJokeUrl = "https://api.chucknorris.io/jokes/random";
const categoriesUrl = "https://api.chucknorris.io/jokes/categories";
//const categoryJokeUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;

const randomJokeBtn = document.getElementById("random-joke");
const errorPara = document.querySelector(".error");
const jokePara = document.querySelector(".joke");

const getCategories = async function () {
  const categoryList = document.getElementById("categories");

  try {
    const response = await fetch(categoriesUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    result.map((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.innerHTML = category;
      categoryList.appendChild(option);
    });
  } catch (error) {
    console.error(error.message);
  }
};

getCategories();
