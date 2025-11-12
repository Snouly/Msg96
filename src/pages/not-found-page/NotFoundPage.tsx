import { Link } from "react-router";

export const NotFoundPage = () => {
    
    const style = {
        color: 'whte',
        fontSize: '16px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#C0C0C0',
        width: 'fit-content',

        borderWidth: '2px',
        borderStyle: 'outset',
        borderRightColor: '#424242',
        borderBottomColor: '#424242',
    }

    const linkStyle = {
        color: '#000080',
    }
    
    return (
        <div style={style}>
            <Link to={"/"} style={linkStyle}>-BACK ON TRACK-</Link>
        </div>
    )
}

// export default NotFoundPage;