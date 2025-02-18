import React from "react";

import FooterFilter from "./footer-filters";

const Footer = ({activeLeftCount, selectedFilter, handleFilter, clearComplete}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{activeLeftCount} items left</span>
            <ul className="filters">
                <FooterFilter selectedFilter={selectedFilter} handleFilter={handleFilter}/>
            </ul>
            <button className="clear-completed" onClick={clearComplete}>Clear completed</button>
        </footer>
    )
}

export default Footer;