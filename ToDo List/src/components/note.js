// Class for note
export function Note(id, content){
    const setContent = (newContent) => {
        content = newContent;
    }

    const getContent = () => content;
    const getId = () => id;

    return {
        setContent, getContent, getId
    }
}

