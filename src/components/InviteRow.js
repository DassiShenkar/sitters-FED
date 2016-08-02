import React from 'react';

export default class Invite extends React.Component {
    constructor() {
        super();
    }
    render() {
        const invite = this.props.inviteData;
        let allergies = invite.allergies  != null? invite.allergies.join() : null;
        return (
                <tr>
                    <td>{invite.street}</td>
                    <td>{invite.date}</td>
                    <td>{invite.startTime}</td>
                    <td>{invite.endTime}</td>
                    <td>{invite.recurring}</td>
                    <td>{allergies}</td>
                </tr>
        );
    }
}

