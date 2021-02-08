const search_button = document.getElementById("searchBtn");
const food_list = document.getElementById("foodList");
const food_details = document.getElementById("foodDetails");
//search button function
const getFoodList = () => {
  let input_Value = document.getElementById("TheInput").value;
  if(input_Value !=""){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input_Value}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
          <div class="row custom-flex">
                <div class="col-md-3" data-id="${meal.idMeal}">
                    <div class="card border-0 shadow g-5" style="width: 18rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top rounded-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title text-center">${meal.strMeal}</h5>
                        </div>
                      </div>
                </div>
            </div>
              `;
        });
      } else {
        html = `
          <h2 class="fs-1 text-center text-danger">Sorry! Nothing Found!</h2>
        `;
      }
      food_list.innerHTML = html;
    });
  }else{
    food_list.innerHTML="";
    const errorheading = document.createElement("h2");
    errorheading.innerText = "Write Something!";
    errorheading.style.textAlign="center";
    food_list.appendChild(errorheading);
  }
};
//Search Button event listeners
search_button.addEventListener("click", getFoodList);

//Food details function
const foodDetail = (event) => {
  event.preventDefault();
  if (event.target) {
    let foodItem = event.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
    .then(resonse => resonse.json())
    .then(data => forFoodDetail(data.meals))
  }
};
  function forFoodDetail(meal){
    meal = meal[0];
    let html = `
    <div class="position-absolute top-100 start-50 translate-middle container d-flex justify-content-center align-items-center p-5">
                <div id="showDetails" class="Items-details card border-0 shadow g-2" style="width: 45rem;">
                <span id="closeBtn" class="d-flex justify-content-end"><i class="btn-close bg-light position-absolute top-10"></i></span>
                    <img src="${meal.strMealThumb}" class="card-img-top rounded-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title fs-3">${meal.strMeal}</h5>
                      <h5 class="text-secondary">Ingredients:</h5>
                      <ul id="ul">
                        <li>${meal.strIngredient1}</li>
                        <li>${meal.strIngredient2}</li>
                        <li>${meal.strIngredient3}</li>
                        <li>${meal.strIngredient4}</li>
                        <li>${meal.strIngredient5}</li>
                        <li>${meal.strIngredient6}</li>
                        <li>${meal.strIngredient7}</li>
                        <li>${meal.strIngredient8}</li>
                      </ul>
                    </div>
                  </div>
            </div>
    `
    food_details.innerHTML = html;
    let showDails = document.getElementById("showDetails");
    showDails.classList.add("Show-details");
    food_list.style.display="none";

    //Close btn event listerner
    const close_button = document.getElementById("closeBtn");
    close_button.addEventListener('click',function(){
      showDails.style.display="none";
      food_list.style.display="block";
    })
  }

//Food details event listener
food_list.addEventListener("click", foodDetail);


