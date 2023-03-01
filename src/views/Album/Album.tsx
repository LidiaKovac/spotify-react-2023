import { useEffect } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getAlbumById } from "../../app/actions/album/album"
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import { AlbumCard } from "../../components/AlbumCard/AlbumCard"
import { getDurationString } from "../../utils"
import "./AlbumPage.scss"
import { SingleTrack } from "./SingleTrack/SingleTrack"
export const AlbumPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { data: album, related, loading } = useSelector((state: RootState) => state.album)
    useEffect(() => {
        dispatch(getAlbumById(id!))
    }, [id])
    return (
        <>
            <Col className="main" sm={12} md={9} lg={8}>
                {loading ? <Spinner className="position-absolute top-50 start-50 text-white" animation="border"/> : <>
                
                <div
                    className="album__bg"
                    style={{ backgroundImage: `url(${album.cover_xl})` }}
                ></div>
                <Row className="album__header p-5">
                    <img
                        src={album.cover_xl}
                        alt=""
                        className="col-md-4 col-sm-10 album__cover"
                    />
                    <div className="col-8  col-sm-12 d-flex flex-column justify-content-end ">
                        <div className="album__type text-white fw-bold">{album.type}</div>
                        <h1 className="clickable">{album.title}</h1>
                        <div className="artist__info text-white d-flex flex-row flex-wrap">
                            <img src={album.artist?.picture_medium} className="artist__pic" />
                            <Link to={`/artist/${album.artist?.id}`} className="artist__info--single artist__name text-truncate mx-1 fw-bold">
                                {album.artist?.name}
                            </Link>
                            •
                            <div className="artist__info--single album__year mx-1 fw-bold">
                                {album.release_date?.split("-")[0]}
                            </div>
                            •
                            <div className="artist__info--single album__track-number fw-bold mx-1">
                                {album.nb_tracks}
                            </div>
                            •
                            <div className="artist__info--single album__duration mx-1 text-opaque-white">
                                {getDurationString(album.duration)}
                            </div>
                        </div>
                    </div>
                </Row>
                <div className="container album__data pb-5">
                    <div className="album__tracks mb-5">
                        <Row className="tracks__table-header mx-3 py-3 justify-content-between text-opaque-white">
                            <Col sm={1}>#</Col>
                            <Col sm={5}>titolo</Col>
                            <Col sm={4}>riproduzioni</Col>
                            <Col sm={1}>D</Col>
                        </Row>
                        {album.tracks?.map((song, i) => {
                            return <SingleTrack song={song} index={i + 1} />
                        })}
                    </div>
                    <h2 className="mb-4">
                        Simili a{" "}
                        <span className="album__related-title ">{album.title}</span>
                    </h2>
                    <Row className="album__related">
                        {related.map(album => <AlbumCard album={album} />)}
                    </Row>
                </div>

                </>}
            </Col>
        </>
    )
}
