import React from "react";

export default class ProfileImg extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <img className="profile small-profile" src={this.props.imgUrl} alt="" title=""/>
        );
    }
}
