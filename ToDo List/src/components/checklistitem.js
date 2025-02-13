// Class for checklist item
export function ChecklistItem(id, content, checked){
    const getId = () => id;
    
    // Content management
    const setContent = (newContent) => {
        content = newContent;
    }
    const getContent = () => content;

    // Status management
    const getCheckedStatus = () => checked;
    const setCheckedStatus = (newChecked) => {
        checked = newChecked;
    }

    return {
        setContent, getContent, getId, getCheckedStatus, setCheckedStatus
    }
}