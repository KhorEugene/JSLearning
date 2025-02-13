import { Project } from "./components/projects"
import { generateShortId, genKeyString } from "./utils"
import { DBManager } from "./connectors/database"


export function App(){    
    let projects = [];

    const dbmanager = new DBManager();

    // Function to save projects to storage
    function saveProjects(allProjects){
        let project_reps = allProjects.map(project => {
            const project_rep = {
                "id": project.getId(),
                "title": project.getTitle(),
                "description": project.getDesc(),
                "def": project.getDef(),
            };
            return project_rep
        });
        dbmanager.setStorage(
            genKeyString("app", "projects", 0),
            JSON.stringify(project_reps)
        );
    }

    // Preload all projects from storage
    function loadProjects(){
        //  At the moment app ID is just 0, but moving forward can be the user_id if not using local storage
        let projects = dbmanager.getStorage(genKeyString("app", "projects", 0));
        return JSON.parse(projects)
    }

    const savedProjects = loadProjects();
    if (savedProjects === null){
        // If no projects are saved, create a default project
        console.log("1st time initiazing, default project will be created.");
        projects = [
            new Project(
                    generateShortId(),
                    "Default Project",
                    "This is your default project.",
                    true
                )
        ];
        saveProjects(projects);
    } else {
        projects = savedProjects.map(project => new Project(
                project.id,
                project.title,
                project.description,
                project.def,
            )
        );
    }

    // Projects management
    const addProject = (project) => {
        projects.push(project);
        saveProjects(projects);
    }

    const getProject = (id) => {
        return projects.find(project => project.getId() === id);
    }

    const getProjects = () => projects;

    {
        addProject,
        getProject,
        getProjects
    }
}