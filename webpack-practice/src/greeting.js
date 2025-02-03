import odinImage from "./test.png";
export const greeting = "Hello Eugene!";
   
const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);