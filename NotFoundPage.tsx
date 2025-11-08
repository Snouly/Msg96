import { Link } from "react-router";

export const NotFoundPage = () => {
    
    const style = {
        color: 'whte',
        fontSize: '16px',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
    }
    
    return (
        <div style={style}>
            <Link to={"/"}>BACK ON TRACK</Link>
        </div>
    )
}

// export default NotFoundPage;