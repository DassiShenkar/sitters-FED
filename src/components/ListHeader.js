import React from 'react';
import '../styles/components/listHeader.scss';
import Star from '../styles/icons/Star';
import Bell from '../styles/icons/Bell';
import Clock from '../styles/icons/Clock';
import Heart from '../styles/icons/Heart';
import Gender from '../styles/icons/Gender';
import All from '../styles/icons/All';

export default class Sitter extends React.Component {
    constructor() {
        super();
    }
    render() {
        const listClassName = "list-header-" + this.props.className;
        const firstTitle = this.props.title.split(" ")[0];
        const secondTitle = this.props.title.split(" ")[1];
        let icon;
        switch(this.props.icon) {
            case "star":
                icon = <Star/>;
                break;
            case "bell":
                icon = <Bell/>;
                break;
            case "clock":
                icon = <Clock/>;
                break;
            case "heart":
                icon = <Heart/>;
                break;
            case "gender":
                icon = <Gender/>;
                break;
            case "all":
                icon = <All/>;
                break;
        }
        return (
            <section className= {listClassName}>
                <div className="list-header-icon">
                    {icon}
                </div>
                <section className="category">
                    <h2 className="list-title">{firstTitle}</h2>
                    <h2 className="list-title">{secondTitle}</h2>
                </section>
            </section>
        );
    }
}

