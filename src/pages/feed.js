import React from 'react';
import ProfileImg from '../components/ProfileImg';
import FilterList from '../components/FilterList';
import Filter from '../styles/icons/Filter';
import Calendar from '../styles/icons/Calendar';
import '../styles/components/feed.scss';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {parentData: {name: localStorage.name, email: localStorage.email,
            profilePictureURL: localStorage.profilePicture}, showFilter: false};
    }

    loadParentFavoriteSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getParentFavoriteSitters',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'email': 'parent1@gmail.com'}),
            success: function (data) {
                this.setState({favoriteSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    onFilterClick(e) {
        e.preventDefault();
        this.setState({showFilter : !this.state.showFilter});
    }
    
    
    render() {
        return (
            <div id="feed">
                <header>
                    <ProfileImg profilePicture={this.state.parentData.profilePictureURL} username={this.state.parentData.name}/>
                    <section className="greeting">
                        <p>Hello</p>
                        <h3 className="name">{this.state.parentData.name}</h3>
                    </section>
                    <section>
                        <Calendar/>
                        <div className="filter-btn" onClick={this.onFilterClick.bind(this)}>
                            <Filter/>
                        </div>
                    </section>
                </header>
                {this.state.showFilter ? <FilterList onFilterChange={this.onFilterChange} className="filter"/> : null}
            </div>
        );
    }
}


