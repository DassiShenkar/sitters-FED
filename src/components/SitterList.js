import React from "react";
import Sitter from "./Sitter";
import ListHeader from "./ListHeader";

export default class SittersList extends React.Component {
    constructor() {
        super();
    }

    render() {
        const listTitle = this.props.title;
        const listClass = this.props.className;
        const sitterNodes = this.props.sittersData.map((sitter, index) => <Sitter key={index} name={sitter.name} email={sitter.email} rating={sitter.rating} profilePictureURL={sitter.profilePictureURL} fullPictureURL={sitter.fullPictureURL}/>);
        return (
            <div>
                <ListHeader title={listTitle} className={listClass}/>
                <div class="sitter-list">{sitterNodes}</div>
            </div>
        );
    }
}
