import ApiKey from "../utils/Constance";
class PhotoApi {
    constructor(url, authorization) {
        this._url = url;
        this.totalPhotos = 0;
        this.authorization = authorization;
    }

    _handleRes(res) {
        if (res.ok) {
            return res.json();
        }
        return res.json()
            .then((err) => {
                const error = new Error(err.message);
                error.status = res.status;
                throw error;
            })
    }

    _setTotalPhotos(value) {
        this.totalPhotos = value;
    }

    getTotalPhotos() {
        return this.totalPhotos;
    }

    getCuratedPhotos(page) {
        return fetch(`${this._url}/photos?per_page=30&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.authorization
            },
        })
            .then((res) => {
                this._setTotalPhotos(res.headers.get('x-total'));
                return res;
            })
            .then(this._handleRes)
    }

    getSearchPhotos(page, query) {
        return fetch(`${this._url}/search/photos?per_page=30&page=${page}&query=${query}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.authorization
            },
        })
            .then((res) => {
                this._setTotalPhotos(res.headers.get('x-total'));
                return res;
            })
            .then(this._handleRes)
    }

    getUserPhotos(page, user) {
        return fetch(`${this._url}/users/${user}/photos?per_page=30&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.authorization
            },
        })
            .then((res) => {
                this._setTotalPhotos(res.headers.get('x-total'));
                return res;
            })
            .then(this._handleRes)
    }
}

const photoApi = new PhotoApi('https://api.unsplash.com', `Client-ID ${ApiKey}`);
export default photoApi;