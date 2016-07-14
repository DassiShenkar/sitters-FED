import React from "react";

export default class Sitter extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <section className="list-header">
                <div className="icon star-container"></div>
                <div className="category">
                    <h2>{this.props.title}</h2>
                </div>
            </section>
        );
    }
}

