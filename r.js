const searchBox = document.querySelector(".searchBox");
const searcBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

// function to get recipes
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Featching Recipes...</h2>";
  try {
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();

  recipeContainer.innerHTML = "";
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
             <p>Beelongs to <span>${meal.strCategory}</span> Category</p>
        `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    // adding EventLisitner to recipe button
    button.addEventListener("click", () => {
      openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);
  });
} 
catch (error) {
    recipeContainer.innerHTML = "<h2>Error in Featching Recipes...</h2>"
}
};

// Function to fetch ingreadient and measurements
const fetchIngredient = (meal) => {
  let ingreadientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingreadient = meal[`strIngredient${i}`];
    if (ingreadient) {
      const measure = meal[`strMeasure${i}`];
      ingreadientsList += `<li>${measure} ${ingreadient}</li>`;
    } else {
      break;
    }
  }
  return ingreadientsList;
};
const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="IngreadentList">${fetchIngredient(meal)}</ul>
     <div  class=" ">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    `;
   
  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener('click', () => {
  recipeDetailsContent.parentElement.style.display = "none";
}); 
searcBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  // if(!searchInput){
  //   recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
  //   return;
  // }
  fetchRecipes(searchInput);
  // console.log("Button Clicked");
});
