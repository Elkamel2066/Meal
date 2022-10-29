var textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
  });

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }


  /////////////////////////////////////
  const searchBtn = document.getElementById('search-btn');
  const mealList = document.getElementById('meal');
  const mealDetailsContent = document.querySelector('.meal-details-content');
  const recipeCloseBtn = document.getElementById('recipe-close-btn');
  
  // event listeners
  searchBtn.addEventListener('click', getMealList);
  mealList.addEventListener('click', getMealRecipe);
  recipeCloseBtn.addEventListener('click', () => {
      mealDetailsContent.parentElement.classList.remove('showRecipe');
  });
  
  
  // get meal list that matches with the ingredients
  function getMealList(){
      let searchInputTxt = document.getElementById('search-input').value.trim();
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
      .then(response => response.json())
      .then(data => {
          let html = "";
          if(data.meals){
              data.meals.forEach(meal => {
                  html += `
                      <div class = "meal-item text-center"" data-id = "${meal.idMeal}">
                  
                      <div class = "meal-img">
                          <img  src ="${meal.strMealThumb}" alt = "food"></img>
                          </div>
                          <div class = "meal-name">
                              <h3>${meal.strMeal}</h3>
                              <a href = "#" class = "recipe-btn text-center">Get Recipe</a>
                          </div>
                      </div>
                  `;
              });
              mealList.classList.remove('notFound');
          } else{
              html = "Sorry, we didn't find any meal!";
              mealList.classList.add('notFound');
          }
  
          mealList.innerHTML = html;
      });
  }
  
  function getMealRecipe(e){
      e.preventDefault();
      if(e.target.classList.contains('recipe-btn')){
          let mealItem = e.target.parentElement.parentElement;
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
          .then(response => response.json())
          .then(data => mealRecipeModal(data.meals));
      }
  }
  
  function mealRecipeModal(meal){
      console.log(meal);
      meal = meal[0];
      let html = `
          <h2 class = "recipe-title">${meal.strMeal}</h2>
          <p class = "recipe-category">${meal.strCategory}</p>
          <div class = "recipe-instruct">
              <h3>Instructions:</h3>
              <p>${meal.strInstructions}</p>
          </div>
          <div class = "recipe-meal-img">
              <img src = "${meal.strMealThumb}" alt = "">
          </div>
          <div class = "recipe-link">
              <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
          </div>
      `;
      mealDetailsContent.innerHTML = html;
      mealDetailsContent.parentElement.classList.add('showRecipe');
  }



  
