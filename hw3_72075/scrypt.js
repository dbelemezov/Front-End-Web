const filter_name = document.getElementById("filter_name");
const filter_region = document.getElementById("filter_region");
const filter_category = document.getElementById("filter_category");
const list = document.getElementById("recipes");

function insert_list_item(recipe){
    const creating_list_item = document.createElement('li');
    const created_table = document.createElement('table');

    recipe["ingredients"].forEach((ingredient) => 
    {    
    const table_row = document.createElement('tr');
    const ingredient_td = document.createElement('td');
    const measure_td = document.createElement('td');               
    ingredient_td.innerText = ingredient["name"];
    measure_td.innerText = ingredient["measure"];
    table_row.appendChild(ingredient_td);
    table_row.appendChild(measure_td);
    created_table.appendChild(table_row);
    })

    creating_list_item.innerHTML = 
    `
    <div class="recipe_container">
        <div class = "img_name">
            <img src = "${recipe["image"]}">
            <span id = "test_to_get">${recipe["name"]}</span>
        </div>
        <div class = "category_region_button">
            <span>${recipe["category"]}, ${recipe["region"]}</span>
            <button onclick = "document.getElementById('${recipe["id"]}').style.display = 'block'">See Recipe</button>
        </div>
    </div>
    <div id = "${recipe["id"]}" class = "view">
        <div class = "content">     
            <div id = "meal_title">
                <p>${recipe["name"]}</p>
            </div>
            <div id = "main_information">
                <img src = "${recipe["image"]}">
                <p>${recipe["instruction"]}</p>
                <table class = "inner_table">
                <tr>
                    <th>Ingredients</th>
                    <th>Measure</th>
                </tr>
                ${created_table.innerHTML}
                </table>
            </div>
            <div id = "button_close">
                <button onclick = "document.getElementById('${recipe["id"]}').style.display = 'none'">Close</button>
            </div>  
        </div>
    </div>
    `;
    list.appendChild(creating_list_item);
}

async function generate_all_recipes() {
    const response = await fetch (`https://api.npoint.io/51ed846bdd74ff693d7e`);
    var recipes = await response.json();
    recipes["meals"].forEach((recipe) => insert_list_item(recipe));
}
  
filter_name.addEventListener("change", (event) => {
    const search = event.target.value;
    const every_list_item = Array.from(document.getElementsByTagName("li"));
    every_list_item.forEach((li) => 
    {
        const li_name = li.firstChild.nextSibling.firstChild.nextSibling.innerText;
        li.toggleAttribute("hidden",!((li_name.toUpperCase()).includes(search.toUpperCase())));
    })
    event.target.value = "";
});

filter_region.addEventListener("change", (event) => {
    const search = event.target.value;
    const every_list_item = Array.from(document.getElementsByTagName("li"));
    every_list_item.forEach((li) => 
    {
        const li_region = li.firstChild.nextSibling.children[1].innerText;
        li.toggleAttribute("hidden",!((li_region.toUpperCase()).includes(search.toUpperCase())));
    })
    event.target.value = "";
});

filter_category.addEventListener("change", (event) => {
    const search = event.target.value;
    const every_list_item = Array.from(document.getElementsByTagName("li"));
    every_list_item.forEach((li) => 
    {
        const li_category = li.firstChild.nextSibling.children[1].innerText;
        li.toggleAttribute("hidden",!((li_category.toUpperCase()).includes(search.toUpperCase())));
    })
    event.target.value = "";
});

generate_all_recipes();