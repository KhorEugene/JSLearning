import { mainContent } from "./loadhome";


export function LoadAbout() {    
    // Function to create an element with optional attributes and text content
    function createElement(tagName, attributes = {}, textContent = null) {
        const element = document.createElement(tagName);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        if (textContent !== null) {
            element.textContent = textContent;
        }
        return element;
    }
  
    // Create the about content div
    const aboutContentDiv = createElement('div', { id: 'aboutcontent' });
    
    // Create the "About Us" section
    const aboutUsSection = createElement('section', { id: 'about-us' });
    const aboutUsHeading = createElement('h2', {}, 'About Restaurant Balls');
    const aboutUsParagraph = createElement('p', {}, 'Restaurant Balls is a family-owned establishment serving delicious fusion cuisine. We pride ourselves on using fresh, high-quality ingredients to create unique and memorable dining experiences.');
    aboutUsSection.appendChild(aboutUsHeading);
    aboutUsSection.appendChild(aboutUsParagraph);
    aboutContentDiv.appendChild(aboutUsSection);
    
    
    // Create the "Contact Us" section
    const contactSection = createElement('section', { id: 'contact' });
    const contactHeading = createElement('h2', {}, 'Contact Us');
    const phoneParagraph = createElement('p', {}, 'Phone: ');
    const phoneLink = createElement('a', { href: 'tel:+15551234567' }, '+1 555-123-4567'); // Replace with your phone number
    phoneParagraph.appendChild(phoneLink);
    const emailParagraph = createElement('p', {}, 'Email: ');
    const emailLink = createElement('a', { href: 'mailto:restaurantballs@email.com' }, 'restaurantballs@email.com'); // Replace with your email
    emailParagraph.appendChild(emailLink);
    contactSection.appendChild(contactHeading);
    contactSection.appendChild(phoneParagraph);
    contactSection.appendChild(emailParagraph);
    aboutContentDiv.appendChild(contactSection);
    
    mainContent.appendChild(aboutContentDiv);
    document.body.append(mainContent);
}