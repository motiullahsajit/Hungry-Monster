//funtion of showing result by search
const showBySearch = () => {
    const searchInput = document.getElementById('search-input');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.meals) {
                const mealItem = data.meals;
                getMealDiv(mealItem);
            }
            else {
                const collectionOfMeals = document.getElementById('meals-collection');
                const noResult = `<h1 class="text-danger p-2">No Result Found !!</h1>`;
                collectionOfMeals.innerHTML = noResult;
                const searchInput = document.getElementById('search-input');
                searchInput.value = '';
            }
        })
        .catch(error => {
            const collectionOfMeals = document.getElementById('meals-collection');
            const errorText = `<h1 class="text-danger p-2">Sorry failed to load data !!</h1>`;
            collectionOfMeals.innerHTML = errorText;
            const searchInput = document.getElementById('search-input');
            searchInput.value = '';
        });
};
const getMealDiv = mealItem => {
    const collectionOfMeals = document.getElementById('meals-collection');
    collectionOfMeals.innerHTML = '';
    mealItem.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'col-lg-3 col-md-6 col-sm-12';
        const mealCard = `
            <div class="card" onClick="detailsPopUp(${meal.idMeal})">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="card-body">
               <h3 class="card-title">${meal.strMeal}</h3>
            </div>
             </div>
            `;
        mealDiv.innerHTML = mealCard;
        collectionOfMeals.appendChild(mealDiv);
    });
};

// details popUp
const detailsPopUp = mealId => {
    document.getElementById("popUpId").classList.toggle("active");
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            const detailsPopuUp = document.getElementById('popUp-Content-Id');
            detailsPopuUp.innerHTML = `
            <button class="close-btn" onclick="detailsPopUp()"><i class="far fa-times-circle"></i></button>
            <div class="card p-3">
                <img src="${meal.strMealThumb}">
                <h1 class="card-title p-2" >${meal.strMeal}</h1>
                <h5 class="p-2">Ingredients</h5>
            <div class="card-boby">
                <ul class="p-2">
                    <li><i class="fas fa-check-square"></i> ${meal.strMeasure1} ${meal.strIngredient1}</li>
                    <li><i class="fas fa-check-square"></i> ${meal.strMeasure2} ${meal.strIngredient2}</li>
                    <li><i class="fas fa-check-square"></i> ${meal.strMeasure3} ${meal.strIngredient3}</li>
                    <li><i class="fas fa-check-square"></i> ${meal.strMeasure4} ${meal.strIngredient4}</li>
                    <li><i class="fas fa-check-square"></i> ${meal.strMeasure5} ${meal.strIngredient5}</li>
                    <li><i class="fas fa-check-square"></i> ${meal.strMeasure6} ${meal.strIngredient6}</li>
                </ul>
            </div>
            <a class="card-footer bg-transparent text-center" href = "${meal.strYoutube}" target = "_blank">Watch the recipe video</a>
            </div>
            `;
        })
        .catch(error => {
            const errorPopuUp = document.getElementById('popUp-Content-Id');
            errorPopuUp.innerHTML = `<div class"p-3">
            <button class="close-btn" onclick="togglePopup()"><i class="far fa-times-circle"></i></button>
            <h2 class="text-danger text-center pt-5">Sorry failed to load data !!</h2>
            <h5 class="text-danger text-center pb-5">Please try again after some time</h5>
            </div>
            `;
        });
};
