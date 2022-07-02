import React from "react";
import "./Card.css"

function Card(props) {
    function handleClick() {
        props.onClick(props.photo);
    }

    return (
        <div className="card">
            <img src={props.photo.urls.regular}
                 alt={props.photo.alt_description !== null ? props.photo.alt_description : (props.photo.description !== null ? props.photo.description : 'photo from unsplash')}
                 className="card__image" onClick={handleClick}/>
        </div>
    )
}

export default Card;