import { mainContent } from "./loadhome";


export function LoadMenu() {    
    const menubody = document.createElement("div");
    menubody.id = "menubody";

    const h1 = document.createElement("h1");
    h1.textContent = "Our Menu";
    menubody.appendChild(h1);

    // Function to create a menu section
    function createMenuSection(title, items) {
    const section = document.createElement("section");
    section.className = "menu-section";
    const h2 = document.createElement("h2");
    h2.textContent = title;
    section.appendChild(h2);
    const ul = document.createElement("ul");
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });
    section.appendChild(ul);
    return section;
    }


    menubody.appendChild(createMenuSection("Appetizers", ["Bruschetta - £8", "Bacon Salad - £10", "Calamari - £12"]));
    menubody.appendChild(createMenuSection("Main Courses", ["Chicken Rendang - £12", "Chicken Parmesan - £13", "Kung Pao Chicken - £14"]));
    menubody.appendChild(createMenuSection("Desserts", ["Tiramisu - £9", "Chocolate Lava Cake - £10", "Pancakes - £8"]));

    mainContent.appendChild(menubody);

    document.body.append(mainContent);
}