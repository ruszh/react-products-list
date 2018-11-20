export const sortByCheck = (a, b) => a.selected === b.selected ? 0 : b.selected ? 1 : -1;
export const sortByName = (a, b) => a.name > b.name ? 1 : -1;
export function* generateSequence(end) {
    for(let i = 1; i <= end; i++) {
        yield i;
    }
};

export const createConstant = (name) => ({
    request: `${name}_REQUEST`,
    success: `${name}_SUCCESS`,
    error: `${name}_ERROR`
});

export const createAction = type => payload => ({
    type, payload
});