const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: '67f2451f-15f9-43f6-8704-5398eacc2aeb',
        'Content-Type': 'application/json'
    }
}

export async function getProfileInfo() {
    const result = await fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    });

    if (result.ok) {
        return await result.json();
    }

    return await Promise.reject(result.status);
}

export async function getCards() {
    const result = await fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    });

    if (result.ok) {
        return await result.json();
    }

    return await Promise.reject(result.status);
}

export async function changeProfile(name, about) {
    const result = await fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        })
    });

    if (result.ok) {
        return await result.json();
    }

    return await Promise.reject(result.status);
}

export async function uploadCards(name, link) {
    const result = await fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        })
    });

    if (result.ok) {
        return await result.json();
    }

    return await Promise.reject(result.status);
}

export async function deleteCard(id) {
    const result = await fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    });

    if (result.ok) {
        return await result.json();
    }

    return await Promise.reject(result.status);
}

export async function toggleLike(id, putLike) {
    const result = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: putLike ? 'PUT' : 'DELETE',
        headers: config.headers,
    });

    if (result.ok) {
        return result.json();
    }

    return await Promise.reject(result.status);
}

export async function uploadAvatar(avatar) {
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

    return await Promise.reject(result.status);
}