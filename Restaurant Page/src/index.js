import "./styles.css";
import { LoadHome, mainContent } from "./loadhome";
import { LoadMenu } from "./loadmenu";
import { LoadAbout } from "./loadabout";
import { ErasePage } from "./domtools";

new LoadHome();

const navbuttons = document.querySelectorAll("nav");
navbuttons.forEach(nav => {
  nav.addEventListener('click', function(event) {
    const navId = this.id;
    
    ErasePage(mainContent);

    if (navId === "home") {
      new LoadHome();
    } else if (navId === "menu") {
      new LoadMenu();
    } else if (navId === "about") {
      console.log("test");
      new LoadAbout();
    }
  });
});

