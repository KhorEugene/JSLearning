// Class for checklist item
export function ChecklistItem(id, content, checked){
    const setContent = (newContent) => {
        content = newContent;
    }

    const getContent = () => content;
    const getId = () => id;
    const getCheckedStatus = () => checked;
    const setCheckedStatus = (newChecked) => {
        checked = newChecked;
    }

    return {
        setContent, getContent, getId, getCheckedStatus, setCheckedStatus
    }
}