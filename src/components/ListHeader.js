import React from "react";

export default class Sitter extends React.Component {
    constructor() {
        super();
    }
    render() {
        const listClassName = "list-header " + this.props.className;
        return (
            <section className= {listClassName}>
                <div className="icon star-container"></div>
                <div className="category">
                    <h2>{this.props.title}</h2>
                </div>
            </section>
        );
    }
}

