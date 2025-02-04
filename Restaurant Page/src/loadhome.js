import food1 from "./food1.jpg";
import food2 from "./food2.jpg";
import food3 from "./food3.jpg";
import restaurant from "./restaurant.jpg";

export const mainContent = document.getElementById("content"); 

export function LoadHome() {    
    // Define L2s
    const heading = document.createElement("h1");
    
    heading.textContent = "Welcome to Restaurant Balls";
    const image = document.createElement("img");
    image.id = "mainImg";
    image.src = restaurant; // Replace with the actual path to your image
    image.alt = "Restaurant Balls";
    const paragraph1 = document.createElement("p");
    paragraph1.textContent = "Eat here and pay well, don't break my balls.";
    const heading2 = document.createElement("h2");
    heading2.textContent = "Our Specialties";
    const divL2 = document.createElement("div");
    divL2.className = "specialty-grid";


    // Define L3s
    const divL31 = document.createElement("div");
    divL31.className = "specialty";
    const divL32 = document.createElement("div");
    divL32.className = "specialty";
    const divL33 = document.createElement("div");
    divL33.className = "specialty";

    // Define L4s
    const imageL41 = document.createElement("img");
    imageL41.src = food1; // Replace with the actual path to your image
    imageL41.alt = "Chicken Rendang";
    const heading31 = document.createElement("h3");
    heading31.textContent = "Chicken Rendang";
    const paragraph31 = document.createElement("p");
    paragraph31.textContent = "Malaysian chicken curry with Rendang sauce";

    const imageL42 = document.createElement("img");
    imageL42.src = food2; // Replace with the actual path to your image
    imageL42.alt = "Bacon salad";
    const heading32 = document.createElement("h3");
    heading32.textContent = "Bacon salad";
    const paragraph32 = document.createElement("p");
    paragraph32.textContent = "Fresh salad with bacon, potatoes and tomatoes";

    const imageL43 = document.createElement("img");
    imageL43.src = food3; // Replace with the actual path to your image
    imageL43.alt = "Kung Pao Chicken";
    const heading33 = document.createElement("h3");
    heading33.textContent = "Kung Pao Chicken";
    const paragraph33 = document.createElement("p");
    paragraph33.textContent = "Chinese stir fried chicken with peanuts in kung pau sauce";

    // Nest the elements
    divL31.appendChild(imageL41);
    divL31.appendChild(heading31);
    divL31.appendChild(paragraph31);

    divL32.appendChild(imageL42);
    divL32.appendChild(heading32);
    divL32.appendChild(paragraph32);

    divL33.appendChild(imageL43);
    divL33.appendChild(heading33);
    divL33.appendChild(paragraph33);
    
    divL2.appendChild(divL31);
    divL2.appendChild(divL32);
    divL2.appendChild(divL33);

    mainContent.appendChild(heading);
    mainContent.appendChild(image);
    mainContent.appendChild(paragraph1);
    mainContent.appendChild(heading2);
    mainContent.appendChild(divL2);

    document.body.append(mainContent);
}