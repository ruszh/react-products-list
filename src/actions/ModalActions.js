export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal(name) {
    return {
        type: OPEN_MODAL,
        payload: name
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}