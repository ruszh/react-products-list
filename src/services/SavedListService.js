import CONFIG from '../config';

class SavedListService {
    async loadLists(option) {
        const result = await fetch(`${CONFIG.url}list/load`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: option.userId,
                limit: CONFIG.limit,
                page: option.page,
                sort: option.sort
            })
        });

        return result.json();
    }
    async saveList(listObj) {
        const result = await fetch(`${CONFIG.url}list/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listObj)
            });
        return result.json();
    }
}

export default new SavedListService();