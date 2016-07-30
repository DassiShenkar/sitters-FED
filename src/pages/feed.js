import React from 'react';
import ProfileImg from '../components/ProfileImg';
import FilterList from '../components/FilterList';
import SitterList from '../components/SitterList';
import Filter from '../styles/icons/Filter';
import Bell from '../styles/icons/Bell';
import '../styles/components/feed.scss';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentData: {
                name: localStorage.name, email: localStorage.email,
                profilePictureURL: localStorage.profilePicture
            },
            showFilter: false,
            availableSitters: null
        };
    }

    componentDidMount() {
        this.loadAvailableSittersFromServer();
    }

    loadAvailableSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getAvailableNowSitters',
            dataType: 'json',
            success: function (data) {
                this.setState({availableSitters: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    onFilterClick() {
        this.setState({showFilter: !this.state.showFilter});
    }

    render() {
        const icon = "bell";
        let available;
        if (!this.state.showFilter && this.state.availableSitters) {
            available = <SitterList className="sitters-available-now" title="AVAILABLE NOW"
                                    icon={icon} sittersData={this.state.availableSitters}/>;
        }
        return (
            <div id="feed">
                <header>
                    <section className="parent-profile">
                        <ProfileImg profilePicture={this.state.parentData.profilePictureURL}
                                    username={this.state.parentData.name}/>
                        <section className="greeting">
                            <p>Hello</p>
                            <h3 className="parent-name">{this.state.parentData.name}</h3>
                        </section>
                        <section className="filter-btn">
                            <a onClick={this.onFilterClick.bind(this)}>
                                <Filter/>
                            </a>
                        </section>
                    </section>
                </header>
                {this.state.showFilter ? <FilterList onFilterChange={this.onFilterChange} className="filter"/> : null}
                {available}
            </div>
        );
    }
}


