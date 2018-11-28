//@flow
import CONFIG from '../config';

class AuthService {
    async signin(user: { email: string, password: string }): Promise<any> {
        const { email, password } = user;
        const result = await fetch(`${CONFIG.url}user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        return await result.json();
    }

    async virification(): Promise<any> {
        const token: string | any = localStorage.getItem('token');

        const result = await fetch(`${CONFIG.url}user/verify`, {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        });
        return result.json();
    }

    async signup(user: {
        email: string,
        name: string,
        password: string
    }): Promise<any> {
        const result = await fetch(`${CONFIG.url}user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
                name: user.name
            })
        });
        return result.json();
    }
}

export default new AuthService();
