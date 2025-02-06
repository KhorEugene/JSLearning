// Utilities
export function generateShortId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function genKeyString(parent_category, child_category, id){
    // ID specifies the ID of the parent and the child category specifies what is it mapped to in 1-many mapping
    return `${parent_category}:${child_category}:${id}`
}
