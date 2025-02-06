import { DBManager } from "./connectors/database"
import { Item } from "./components/item"
import { generateShortId, genKeyString } from "./utils"
import { Note } from "./components/note"

const dbmanager = new DBManager();

// const item_id = generateShortId();

// newItem.addNote("testing content in note!")

// let allNotes = newItem.getNotes();


let testItem = new Item("m6tvbdm8771mpxx21fu", "test", "bye", "hey")
// testItem.addNote("second robust note!");
let allNotes = testItem.getNotes()
allNotes.forEach(note => {
    console.log(note.getContent());
})




function ApplicationManager(){
    const createItem = (title, description, dueDate, priority) => {
        const newItem = Item(
            item_id,
            title,
            description,
            dueDate,
            priority,
        );

    }
}




// console.log(dbmanager.setStorage("bye","sir"));

// Class for list


// Class for project


// Class for managing items


// Class for managing lists


// Class for managing projects


// Class for project page


// Class for todos page


// Class for single todo page