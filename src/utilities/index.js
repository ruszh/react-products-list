export const sortByCheck = (a, b) => a.selected === b.selected ? 0 : b.selected ? 1 : -1;
export const sortByName = (a, b) => a.name > b.name ? 1 : -1;