import React from 'react';

export default class Invite extends React.Component {
    constructor() {
        super();
    }

    render() {
        const review = this.props.inviteData;
        let allergies = review.allergies  != null? review.allergies.join : null;
        return (
                <tr>
                    <td>{review.street}</td>
                    <td>{review.date}</td>
                    <td>{review.startTime}</td>
                    <td>{review.endTime}</td>
                    <td>{review.recurring}</td>
                    <td>{allergies}</td>
                </tr>
        );
    }
}

