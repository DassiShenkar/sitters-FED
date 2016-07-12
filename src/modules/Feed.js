import React from 'react';
import ProfileImg from '../components/ProfileImg';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ProfileImg imgUrl="http://icons.iconarchive.com/icons/martin-berube/flat-animal/256/chicken-icon.png"/>
        );
    }
}


