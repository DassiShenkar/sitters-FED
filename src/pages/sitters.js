import React from 'react';
import ReviewList from "../components/ReviewList";

export default class SitterProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: [], email: this.props.params.sitter};
    }

    componentDidMount() {
        this.loadSitterFromServer();
    }

    loadSitterFromServer() {
        $.ajax({
            url: "https://sitters-ws.herokuapp.com/getSitterByEmail",
            dataType: 'json',
            contentType: "application/json",
            type: 'POST',
            data: JSON.stringify({email : this.state.email}),
            success: function (data) {
                this.setState({data: data.reviews});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <ReviewList allReviews={this.state.data}/>
        );
    }
}










