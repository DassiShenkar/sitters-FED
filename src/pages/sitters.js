import React from 'react';

export default class SitterProfile extends React.Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props.params.sitter);
        return (
            <div>sitterProfile</div>
        );
    }
}
