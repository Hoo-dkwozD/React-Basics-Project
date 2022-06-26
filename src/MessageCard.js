function MessageCard({ iconName, message }) {
    return (
        <div className="message-card">
            <i id="card-symbol" className="material-icons">{ iconName }</i>
            <span>{ message }</span>
        </div>
    );
}

export default MessageCard;