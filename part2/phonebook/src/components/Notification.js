const Notification = ({message}) => {

    const errorStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    }

    const okStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    }

    if (message === null) {
        return null
    }

    if (message.status === "ok") {
        console.log("hey!");
        return(
            <div style={okStyle}>
                {message.message}
            </div>
        )
    }
    else if (message.status === "error") {
        return(
            <div style={errorStyle}>
                {message.message}
            </div>
        )
    }
}

export default Notification