import React, {useState} from "react";
import "./Search.css";

function Search(props) {
    const [searchValue, setSearchValue] = useState('');

    function handleInputChange(e) {
        const input = e.target;
        setSearchValue(input.value);
        props.setQueryMethod('');
    }

    function search(evt) {
        evt.preventDefault();
        if (searchValue !== '') {
            sessionStorage.setItem('searchQuery', searchValue);
            setSearchValue('');
            props.setQueryMethod('Search');
        }
    }

    return (
        <section className="search">
            <div className="search__container">
                <form action="" className="search__form" onSubmit={search}>
                    <input type="text" className="search__input" required minLength="2" maxLength="30"
                           value={searchValue} onChange={handleInputChange} placeholder="Search query"/>
                    <input type="submit" className="search__submit" value="Search"/>
                </form>
            </div>
        </section>
    )
}

export default Search;