import React from 'react';
import ProfileImg from '../components/ProfileImg';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        this.loadParentFromServer();
        setInterval(this.loadParentFromServer.bind(this), 2000);
    }

    loadParentFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getParentbyEmail',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'email': 'parent1@gmail.com'}),
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <header>
                <ProfileImg profilePicture={this.state.data.profilePictureURL} username={this.state.data.name}/>
                <section>
                    <p className="greeting">Hello</p>
                    <h3 className="name">{this.state.data.name}</h3>
                </section>
            </header>
        );
    }
}


