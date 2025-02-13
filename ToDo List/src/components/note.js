// Class for note
export function Note(id, content){
    const getId = () => id;
    
    // Content management
    const setContent = (newContent) => {
        content = newContent;
    }
    const getContent = () => content;

    return {
        setContent, getContent, getId
    }
}

