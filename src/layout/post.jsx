import React from 'react';

export default function Post(props) {
    return <div style={{
        backgroundColor: "#F2F2F2",
        flex: props.size,
        flexBasis: `calc(${props.size / 5} * 100%)`,
        margin: 15,
        padding: 15,
        display: "flex",
        minHeight: props.minHeight,
    }}>
        <div style={{
            marginTop: "auto",
        }}>
            <h3>{props.header}</h3>
            <h5>{props.subheader}</h5>
        </div>
    </div>
}