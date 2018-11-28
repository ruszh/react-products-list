//@flow
import CONFIG from '../config';
import type { List } from '../containers/ModalContainer/types';

type Option = {
    userId: string,
    page: number,
    sort: string
};

class SavedListService {
    async loadLists(option: Option): Promise<any> {
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
    async saveList(listObj: List): Promise<any> {
        const result = await fetch(`${CONFIG.url}list/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listObj)
        });
        return result.json();
    }
    async getList(listId: string): Promise<any> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listId
            })
        };

        const result = await fetch(`${CONFIG.url}list/get`, options);
        if (result.statusText === 'OK') {
            return result.json();
        }
        return new Error('List not found');
    }
    async deleteList(listId: string): Promise<any> {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listId
            })
        };
        const result = await fetch(`${CONFIG.url}list/delete`, options);
        if (result.statusText === 'OK') {
            return result.json();
        }

        return new Error('Something go wrong');
    }
}

export default new SavedListService();
