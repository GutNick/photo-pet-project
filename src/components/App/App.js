import React, {useEffect, useState} from "react";
import CardList from "../CardList/CardList";
import photoApi from "../../utils/PhotoApi";
import ImagePopup from "../ImagePopup/ImagePopup";
import Search from "../Search/Search";
import "./App.css"

function App() {
    const [photos, setPhotos] = useState([]);
    const [totalPhotos, setTotalPhotos] = useState(0);
    const [page, setPage] = useState('1');
    const [selectedCard, setSelectedCard] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [queryMethod, setQueryMethod] = useState('Popular');
    const [finished, setFinished] = useState(false)
    const [toTopShow, setToTopShow] = useState(false);

    useEffect(() => {
        if (totalPhotos <= photos.length) {
            setFinished(true)
        } else {
            setFinished(false)
        }
    }, [photos, totalPhotos])

    useEffect(() => {
        if (queryMethod === 'Popular') {
            getPhotos('1')
        } else if (queryMethod === 'Search') {
            getSearchPhotos('1')
        } else if (queryMethod === 'User') {
            getUserPhotos('1')
            handleClosePopup()
        }
    }, [queryMethod])

    useEffect(() => {
        const nextPage = Math.round(photos.length / 30 + 1).toString();
        setPage(nextPage);
    }, [photos])

    function getPhotos(pageNumber) {
        setIsLoading(true);
        photoApi.getCuratedPhotos(pageNumber)
            .then((res) => {
                if (pageNumber === '1') {
                    const data = [...res];
                    setPhotos(data);
                } else {
                    const data = [...photos, ...res];
                    setPhotos(data);
                }
                setTotalPhotos(photoApi.getTotalPhotos());
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function getSearchPhotos(pageNumber) {
        setIsLoading(true);
        const query = sessionStorage.getItem('searchQuery');
        photoApi.getSearchPhotos(pageNumber, query)
            .then((res) => {
                if (pageNumber === '1') {
                    const data = [...res.results];
                    setPhotos(data);
                } else {
                    const data = [...photos, ...res.results];
                    setPhotos(data);
                }
                setTotalPhotos(photoApi.getTotalPhotos());
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function getUserPhotos(pageNumber) {
        setIsLoading(true);
        const query = sessionStorage.getItem('user');
        photoApi.getUserPhotos(pageNumber, query)
            .then((res) => {
                if (pageNumber === '1') {
                    const data = [...res];
                    setPhotos(data);
                } else {
                    const data = [...photos, ...res];
                    setPhotos(data);
                }
                setTotalPhotos(photoApi.getTotalPhotos());
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function resetSearchQuery() {
        setQueryMethod('Popular');
        sessionStorage.removeItem('searchQuery');
        sessionStorage.removeItem('user');
    }

    function handleCardClick(photo) {
        setSelectedCard(photo)
    }

    function handleClosePopup() {
        setSelectedCard({});
    }

    function handleScrollToTop() {
        window.scrollTo(0, 0)
    }

    function showButton() {
        if (window.innerHeight*2 < window.scrollY) {
            setToTopShow(true);
        } else {
            setToTopShow(false);
        }
    }

    return (
        <div className="App">
            <div className="app__buttons">
                <button onClick={resetSearchQuery} className={`app__button ${queryMethod === 'Popular' || queryMethod === '' ? 'app__button_hidden' : ''}`}>Back to main</button>
                <button onClick={handleScrollToTop} className={`app__button ${!toTopShow ? 'app__button_hidden' : ''}`}>To top</button>
            </div>
            <Search
                setQueryMethod={setQueryMethod}
            />
            <CardList
                photos={photos}
                totalPhotos={totalPhotos}
                getMoreCuratedPhotos={getPhotos}
                getMoreSearchPhotos={getSearchPhotos}
                getMoreUserPhotos={getUserPhotos}
                onClick={handleCardClick}
                isLoading={isLoading}
                queryMethod={queryMethod}
                page={page}
                finished={finished}
                showButton={showButton}
            />
            <ImagePopup
                photo={selectedCard}
                onClose={handleClosePopup}
                setQueryMethod={setQueryMethod}
                queryMethod={queryMethod}
            />
            <p className="card-list__loading-result">{finished ? 'No more photos' : isLoading ? 'Loading images' : ''}</p>
        </div>
    );
}

export default App;
