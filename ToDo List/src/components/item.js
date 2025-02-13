import { DBManager } from "../connectors/database"
import { Note } from "./note"
import { ChecklistItem } from "./checklistitem"
import { genKeyString } from "../utils"

// Class for item
export function Item(
    id,
    title,
    description,
    dueDate,
    priority,
    notes=[],
    checklist=[]
){
    // Initialize database connector
    const dbmanager = new DBManager();

    const getId = () => id;

    // Load notes/CI from DB
    function loadNotes(item_id){
        let note = dbmanager.getStorage(genKeyString("item", "note", item_id));
        return JSON.parse(note)
    }

    function loadChecklistItems(item_id){
        let checklistitem = dbmanager.getStorage(genKeyString("item", "checklistitem", item_id));
        return JSON.parse(checklistitem)
    }

    const savedNotes = loadNotes(getId())
    if (savedNotes === null){
        console.log("No notes found");
    } else {
        notes = savedNotes.map(note => new Note(note.id, note.content));
    }

    const savedCI = loadChecklistItems(getId())
    if (savedCI === null){
        console.log("No checklist items found");
    } else {
        checklist = savedCI.map(CI => new ChecklistItem(CI.id, CI.content, CI.checked));
    }

    // Function to save notes to DB
    function saveNotes(allNotes, item_id){
        let note_reps = allNotes.map(note => {
            const note_rep = {
                "id": note.getId(),
                "content": note.getContent(),
            };
            return note_rep
        });
        dbmanager.setStorage(genKeyString("item", "note", item_id), JSON.stringify(note_reps));
    }

    // Function to save CI to DB
    function saveCI(allCI, item_id){
        let ci_reps = allCI.map(CI => {
            const ci_rep = {
                "id": CI.getId(),
                "content": CI.getContent(),
                "checked": CI.getChecked(),
            };
            return ci_rep
        });
        dbmanager.setStorage(genKeyString("item", "checklistitem", item_id), JSON.stringify(ci_reps));
    }

    // Title management
    const setTitle = (newTitle) => {
        title = newTitle;
    };

    const getTitle = () => title;

    // Description management
    const setDesc = (newDesc) => {
        description = newDesc;
    };

    const getDesc = () => description;

    // Due Date Management
    const setDueDate = (newDueDate) => {
        dueDate = newDueDate;
    };

    const getDueDate = () => dueDate;

    // Priority Management
    const setPriority = (newPriority) => {
        priority = newPriority;
    };

    const getPriority = () => priority;

    // Notes Management
    const addNote = (newNote) => {
        notes.push(newNote);
        saveNotes(notes, getId());
    }

    const getNote = (id) => {
        return notes.find(note => note.getId() === id);
    }

    const getNotes = () => notes;

    // Checklist Management
    const addChecklistItem = (newCI) => {
        checklist.push(newCI);
        saveCI(checklist, getId());
    }

    const getChecklistItem = (id) => {
        return checklist.find(checklist => checklist.getId() === id);
    }

    const getChecklist = () => checklist;

    

    return {
        getId,
        setTitle,
        getTitle,
        setDesc,
        getDesc,
        setDueDate,
        getDueDate,
        setPriority,
        getPriority,
        addNote,
        getNote,
        getNotes,
        addChecklistItem,
        getChecklistItem,
        getChecklist
    }
}

// let testnote = new Note(1, "hello");

// console.log(testnote.getContent());

// const testItem = Item(
//     1, // id
//     "Grocery Shopping", // title
//     "Buy milk, eggs, bread, and cheese.", // description
//     "2024-03-15", // dueDate (consider using Date objects for better date handling)
//     "High", // priority
//   );

// let allNotes = testItem.getNotes();

// console.log(allNotes);

// testItem.addNote("yello");

// allNotes = testItem.getNotes();

// console.log(allNotes);

// allNotes.forEach(test => {
//     console.log(test.getContent());
// })


