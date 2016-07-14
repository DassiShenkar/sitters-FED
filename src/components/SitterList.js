import React from "react";
import Sitter from "./Sitter";

export default class SittersList extends React.Component {
    constructor() {
        super();
    }

    render() {
        const sitterNodes = this.props.sittersData.map((sitter, index) => <Sitter key={index} name={sitter.name}/>);
        return (
            // 
            <div class="sitter-list">{sitterNodes}</div>
        );
    }
}
