import React from 'react';
import '../styles/components/listHeader.scss';

export default class Sitter extends React.Component {
    constructor() {
        super();
    }
    render() {
        const listClassName = "list-header-" + this.props.className;
        const firstTitle = this.props.title.split(" ")[0];
        const secondTitle = this.props.title.split(" ")[1];
        return (
            <section className= {listClassName}>
                <div className="icon star-container"></div>
                <section className="category">
                    <h2 className="list-title">{firstTitle}</h2>
                    <h2 className="list-title">{secondTitle}</h2>
                </section>
            </section>
        );
    }
}

