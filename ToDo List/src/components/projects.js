import { DBManager } from "../connectors/database"
import { ToDoList } from "./todolist"
import { genKeyString } from "../utils"


// Class for To Do List
export function Project(
    id,
    title,
    description,
    def=false,
    todolists=[],
){
    // Initialize database connector
    const dbmanager = new DBManager();

    const getId = () => id;

    // Default checking management
    const getDef = () => def;

    const setDef = (newDef) => {
        def = newDef;
    };

    // Preload lists from storage to the project
    function loadTdLists(project_id){
        let tdlists = dbmanager.getStorage(genKeyString("project", "tdlist", project_id));
        return JSON.parse(tdlists)
    }

    const savedLists = loadTdLists(getId())
    if (savedLists === null){
        console.log("No lists found");
    } else {
        todolists = savedLists.map(list => new ToDoList(
                list.id,
                list.title,
            )
        );
    }

    // Function to save lists mapped to project in storage
    function saveLists(allLists, project_id){
        let list_reps = allLists.map(list => {
            const list_rep = {
                "id": list.getId(),
                "title": list.getTitle(),
            };
            return list_rep
        });
        dbmanager.setStorage(genKeyString("project", "tdlist", project_id), JSON.stringify(list_reps));
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

    // Lists management
    const addList = (list) => {
        todolists.push(list);
        saveLists(todolists, getId());
    }

    const getList = (id) => {
        return todolists.find(list => list.getId() === id);
    }

    const getLists = () => todolists;

    return {
        getId,
        setTitle,
        getTitle,
        setDef,
        getDef,
        setDesc,
        getDesc,
        addList,
        getList,
        getLists
    }
}