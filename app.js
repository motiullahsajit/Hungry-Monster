//funtion of showing result by search
function showBySearch() {
    const mealList = document.getElementById('collectionOfMeal');
    let searchInput = document.getElementById('search-input');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            let mealCollection = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    const mealList = document.createElement('div');
                    mealList.className = 'meals';
                    mealCollection += `
                    <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card">
                     <img src="${meal.strMealThumb}" alt="${meal.strMeal}" onClick="togglePopup(${meal.idMeal})">
                     <div class="card-body">
                        <h3 class="card-title" onClick="togglePopup(${meal.idMeal})">${meal.strMeal}</h3>
                     </div>
                      </div>
                    </div>
                    `;
                });
            }
            else {
                mealCollection = `<h1>No Result Found !!</h1>`;
                let searchInput = document.getElementById('search-input');
                searchInput.value = '';
            }
            mealList.innerHTML = mealCollection;
        });
};

//popup of the details
let togglePopup = mealId => {
    document.getElementById("popupId").classList.toggle("active");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const insidePopuUp = document.getElementById('popUp-Content-Id');
            let meal = data.meals[0];
            insidePopuUp.innerHTML = `
            <button class="close-btn" onclick="togglePopup()"><i class="far fa-times-circle"></i></button>
            <div class="card">
            <img src="${meal.strMealThumb}">
            <div class="card-boby">
            <h1 class="card-title p-2" >${meal.strMeal}</h1>
            <h5 class="p-2">Ingredients</h5>
            <ul class="p-2">
            <li><i class="fas fa-check-square"></i> ${meal.strIngredient1}</li>
            <li><i class="fas fa-check-square"></i> ${meal.strIngredient2}</li>
            <li><i class="fas fa-check-square"></i> ${meal.strIngredient3}</li>
            <li><i class="fas fa-check-square"></i> ${meal.strIngredient4}</li>
            <li><i class="fas fa-check-square"></i> ${meal.strIngredient5}</li>
            </ul>
            </div>
            <a class="card-footer bg-transparent text-center" href = "${meal.strYoutube}" target = "_blank">Watch the recipe video</a>
            </div>
            `
        })
}