import React, {useEffect, useState} from 'react';
import Card from "../Card/Card";
import "./CardList.css";

function CardList(props) {
    const [photos, setPhotos] = useState([]);
    const [totalImages, setTotalImages] = useState(0)

    useEffect(() => {
        setPhotos(props.photos.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
        ));
    }, [props.photos])

    useEffect(() => {
        setTotalImages(props.totalPhotos);
    }, [props.totalPhotos])

    function getMorePhotos() {
        if (!props.isLoading && !props.finished) {
            if (props.queryMethod === 'Popular') {
                props.getMoreCuratedPhotos(props.page);
            } else if (props.queryMethod === 'Search') {
                props.getMoreSearchPhotos(props.page);
            } else if (props.queryMethod === 'User') {
                props.getMoreUserPhotos(props.page)
            }
        }
    }

    window.onscroll = function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            getMorePhotos();
        }
        setTimeout(props.showButton, 1000)
    };

    return (
        <>
            <div className="card-list">
                {photos.map((photo) =>
                    <Card
                        key={photo.id}
                        photo={photo}
                        onClick={props.onClick}
                    />
                )}
            </div>
        </>
    );
}

export default CardList;