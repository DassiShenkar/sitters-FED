import React from "react";

export default class Clock extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <svg>
                <path d="M50 13c20.4 0 37 16.6 37 37S70.4 87 50 87 13 70.4 13 50 29.6 13 50 13M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5L50 5z"/>
                <path d="M67.3 49H51.9V31.6c0-2.2-1.8-4-4-4s-4 1.8-4 4V51c0 0.4 0.1 0.7 0.1 1 -0.1 0.3-0.1 0.7-0.1 1 0 2.2 1.8 4 4 4h19.4c2.2 0 4-1.8 4-4S69.5 49 67.3 49z"/>
            </svg>
        );
    }
}
