import React from "react";

export default class SittersList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div class="sitter-list">{this.props.name}</div>
        );
    }
}
