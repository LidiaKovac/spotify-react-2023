import { FC } from "react"
import { Col } from "react-bootstrap"
import {Link} from "react-router-dom"
import "./Card.scss"
interface CardProps {
    song: Song
}
export const Card:FC<CardProps> = ({song}) => {
    return (<Col xs={6} sm={3} md={3} xl={2}  className='d-xl-block'>
        <div className='song__card' >
            <img className='song__card-cover' src={song.album.cover_medium} />
            <div className='song__card-title mt-1 text-truncate fw-bold text-white'>
                <Link to={`/album/${song.album.id}`}>
                    {song.title}
                </Link>
            </div>
            <div className='song__card-artist text-light-grey text-truncate'>
                <Link to={`/artist/${song.artist.id}`}>
                    {song.artist.name}
                </Link>
            </div>
        </div>
    </Col> )
}