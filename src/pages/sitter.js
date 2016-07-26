import React from 'react';
// import ProfileImg from '../components/ProfileImg';
// import FilterList from '../components/FilterList';
// import SitterList from '../components/SitterList';
// import Filter from '../styles/icons/Filter';
// import '../styles/components/feed.scss';

export default class Sitter extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.getSitterDetails();
    }

    getSitterDetails() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getSitterByEmail',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'email': localStorage.email}),
            success: function (data) {
                //this.setState({topSitters: data});
                //console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    render() {
        return (
            <div>
                Hello World
            </div>
        );
    }
}


