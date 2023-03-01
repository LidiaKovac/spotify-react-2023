import { FC } from "react"
import { Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getSongsByAlbumId } from "../../app/actions/player/player"
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import "./Card.scss"
interface CardProps {
    album: Album
}
export const AlbumCard: FC<CardProps> = ({ album }) => {
    const dispatch = useAppDispatch()
    const playMusic = () => {
        console.log(album);
        
        dispatch(getSongsByAlbumId(album.id))
    }
    const artist = useSelector((state: RootState) => state.artist.data)
    return (<Col xs={6} sm={3} md={3} xl={2} className='d-xl-block' onClick={playMusic}>
        <div className='song__card' >
            <img className='song__card-cover' src={album.cover_medium} />
            <div className='song__card-title mt-1 text-truncate fw-bold text-white'>
                <Link to={`/album/${album.id}`}>
                    {album.title}
                </Link>
            </div>
            <div className='song__card-artist text-light-grey text-truncate'>
                <Link to={`/artist/${artist.id}`}>
                    {artist.name}
                </Link>
            </div>
        </div>
    </Col>)
}