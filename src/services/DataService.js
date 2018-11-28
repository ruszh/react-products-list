//@flow
import CONFIG from '../config';

class DataService {
    async getData(): Promise<any> {
        const response = await fetch(`${CONFIG.url}user/getlists`);
        if (!response.ok) {
            throw new Error(`Fail to fetch data, ${response.status}`);
        }
        return await response.json();
    }
}

export default new DataService();
