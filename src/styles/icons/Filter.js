import React from "react";

export default class Filter extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <svg>
                <path d="M50,0C22.4,0,0,22.4,0,50c0,27.6,22.4,50,50,50c27.6,0,50-22.4,50-50C100,22.4,77.6,0,50,0z M50,96.3  C24.5,96.3,3.7,75.5,3.7,50S24.5,3.7,50,3.7S96.3,24.5,96.3,50S75.5,96.3,50,96.3z"/>
                <path d="M41.4,58.6v17.7l17.1,0.1V58.6l18.2-24.2H23.2L41.4,58.6z M54.8,57.4v15.3l-9.7-0.1V57.4L30.7,38.2h38.7L54.8,57.4z"/>
            </svg>
        );
    }
}
