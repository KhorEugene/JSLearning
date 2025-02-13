import { DBManager } from "../connectors/database"
import { Item } from "./item"
import { genKeyString } from "../utils"


// Class for To Do List
export function ToDoList(
    id,
    title,
    items=[],
){
    // Initialize database connector
    const dbmanager = new DBManager();

    const getId = () => id;

    // Preload items from storage to the list
    function loadItems(tdlId){
        let item = dbmanager.getStorage(genKeyString("tdlist", "item", tdlId));
        return JSON.parse(item)
    }

    const savedItems = loadItems(getId())
    if (savedItems === null){
        console.log("No items found");
    } else {
        items = savedItems.map(item => new Item(
                item.id,
                item.title,
                item.description,
                item.dueDate,
                item.priority,
            )
        );
    }

    // Function to save items mapped to tdlist in storage
    function saveItems(allItems, tdlId){
        let item_reps = allItems.map(item => {
            const item_rep = {
                "id": item.getId(),
                "title": item.getTitle(),
                "description": item.getDescription(),
                "dueDate": item.getDueDate(),
                "priority": item.getPriority(),
            };
            return item_rep
        });
        dbmanager.setStorage(genKeyString("tdlist", "item", tdlId), JSON.stringify(item_reps));
    }

    // Title management
    const setTitle = (newTitle) => {
        title = newTitle;
    };

    const getTitle = () => title;

    // Item management
    const addItem = (item) => {
        items.push(item);
        saveItems(items, getId());
    }

    const getItem = (id) => {
        return items.find(item => item.getId() === id);
    }

    const getItems = () => items;

    return {
        getId,
        setTitle,
        getTitle,
        addItem,
        getItem,
        getItems
    }
}