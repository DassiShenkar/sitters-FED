import React from "react";

export default class Logo extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <img id="logo" src={'./public/images/logo_sitters_blue.png'} alt="sitters logo" title="sitters-logo"/>
        );
    }
}
