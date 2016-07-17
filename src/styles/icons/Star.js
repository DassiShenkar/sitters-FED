import React from "react";

export default class Star extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <svg>
                <path fill="#f7a1a1" d="M77 90.4L50 76.2 23 90.4l5.2-30L6.4 39.1l30.1-4.4L50 7.4l13.5 27.3 30.1 4.4L71.8 60.4 77 90.4zM27.9 46.1L38.9 56.9l-2.6 15.2L50 64.9l13.7 7.2L61.1 56.9l11.1-10.8-15.3-2.2L50 30l-6.8 13.9L27.9 46.1z"></path>
            </svg>
        );
    }
}
