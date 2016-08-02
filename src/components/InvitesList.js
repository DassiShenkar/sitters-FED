import React from "react";
import Invite from "./InviteRow";
import '../styles/components/inviteList.scss'

export default class InviteList extends React.Component {
    constructor() {
        super();
    }

    render() {
        const inviteNodes = this.props.allInvites.map((invite, index) => <Invite key={index} inviteData={invite} />);
        return (
            <div id="invite-table">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Street</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Recurring</th>
                            <th>Allergies</th>
                        </tr>
                    </thead>
                    <tbody>{inviteNodes}</tbody>
                </table>
            </div>
        );
    }
}
