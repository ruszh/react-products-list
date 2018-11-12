import CONFIG from '../config';

class AuthService {
    async signin(user) {
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

    async virification() {
        const token = localStorage.getItem('token');

        const result = await fetch(`${CONFIG.url}user/verify`, {
                    method: 'GET',
                    headers: {
                        'x-access-token': token
                    }
                });
        return result.json();
    }

    async signup(user) {
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