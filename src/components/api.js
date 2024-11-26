const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: '67f2451f-15f9-43f6-8704-5398eacc2aeb',
        'Content-Type': 'application/json'
    }
}

export async function getProfileInfo() {
    try {
        const result = await fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
        });

        if (result.ok) {
            return result.json();
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getCards() {
    try {
        const result = await fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
        });

        if (result.ok) {
            return result.json();
        }
    } catch (e) {
        console.log(e);
    }
}

export async function changeProfile(name, about) {
    try {
        const result = await fetch(`${config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                name,
                about,
            })
        });

        if (result.ok) {
            return result.json();
        }
    } catch (e) {
        console.log(e);
    }
}

export async function uploadCards(name, link) {
    try {
        const result = await fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name,
                link,
            })
        });

        if (result.ok) {
            return result.json();
        }
    } catch (e) {
        console.log(e);
    }
}

export async function deleteCard(id) {
    try {
        const result = await fetch(`${config.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: config.headers,
        });

        if (result.ok) {
            return result.json();
        }
    } catch (e) {
        console.log(e);
    }
}

export async function toggleLike(id, putLike) {
    try {
        const result = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: putLike ? 'PUT' : 'DELETE',
            headers: config.headers,
        });

        if (result.ok) {
            return result.json();
        }
    } catch (e) {
        console.log(e);
    }
}

export async function uploadAvatar(avatar) {
    try {
        const result = await fetch(`${config.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                avatar,
            })
        });

        if (result.ok) {
            return result.json();
        }
    } catch (e) {
        console.log(e);
    }
}