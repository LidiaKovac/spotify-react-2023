import "./Artist.scss"
import { Col, Row } from "react-bootstrap"
import { useAppDispatch } from "../../app/hooks"
import { useEffect, useState } from "react"
import { getArtistById, getPopularAndAlbums } from "../../actions/artist/artist"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { Card } from "../../components/Card/Card"
import { AlbumCard } from "../../components/AlbumCard/AlbumCard"
export const Artist = () => {
    const { data: artist, popular, albums } = useSelector((state: RootState) => state.artist)
    const [option, setOption] = useState("popular")
    const dispatch = useAppDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getArtistById(id!))
        dispatch(getPopularAndAlbums(Number(id)))
    }, [])
    return (
        <>
            <Col sm={12} md={9} lg={8} className="main">
                <div className="artist__header">
                    <img src={artist.picture_xl} alt="" />
                    <div className="artist__header-content ms-3">
                        <div className="artist__verified text-white fw-bold">
                            <i className="bi bi-patch-check-fill"> </i> Verified Artist
                        </div>
                        <h1 className="text-white">{artist.name}</h1>
                        <div className="monthly__listeners text-white fw-bold">
                            <span className="listeners">{artist.id}</span> monthly listeners
                        </div>
                    </div>
                </div>
                <div className="artist__controls-area m-4 d-flex flex-row gap-3 align-items-center">
                    <button className="artist__play-button text-green">
                        <i className="bi bi-play-circle-fill"> </i>
                    </button>
                    <button className="artist__follow-button text-white fw-bold px-3">
                        Segui
                    </button>
                </div>
                <div className="container">
                    <h2 className="mx-1 pop-title">Popolari</h2>
                    <Row className="artist__popular-tracks mx-3">{artist.tracks?.map(song => <Card key={song.id} song={song} />)}</Row>
                    <h2 className="mx-1 my-4">Discografia</h2>
                    <div className="discography__option">
                        <button
                            className={`discography__option-single popular px-2 py-1 ${option === "popular" ? "option--active" : ""}`}
                            onClick={() => setOption("popular")}
                        // onclick="filterPopular(event.target)"
                        >
                            Uscite popolari
                        </button>
                        <button
                            className={`discography__option-single popular px-2 py-1 ${option === "albums" ? "option--active" : ""}`}
                            onClick={() => setOption("albums")}
                        // onclick="filterAlbums(event.target)"
                        >
                            Album
                        </button>
                    </div>
                    <Row className="option__container my-2">
                        {(option === "popular" && popular.length > 0) ? popular.map(song => <AlbumCard key={song.id} album={song} />) : albums.map(song => <AlbumCard key={song.id} album={song} />)}
                    </Row>
                </div>
            </Col>
        </>
    )
}
