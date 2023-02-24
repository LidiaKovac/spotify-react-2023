import { useEffect } from "react"
import { Row } from "react-bootstrap"
import Col from "react-bootstrap/esm/Col"
import { useSelector } from "react-redux"
import { getSongsByQuery } from "../../actions/home/home"
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import { Card } from "../../components/Card/Card"
import { Jumbotron } from "../../components/Jumbotron/Jumbotron"

import "./Homepage.scss"
export const Homepage = () => {
    let more = useSelector((state: RootState) => state.home.more)
    let fav = useSelector((state: RootState) => state.home.favoriteArtists)
    let related = useSelector((state: RootState) => state.home.related)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(
            getSongsByQuery({
                query: "everything i wanted billie eilish",
                field: "jumbotron",
            })
        )
        // dispatch(getSongsByQuery({query: "oops", field: "recent"}))
        dispatch(getSongsByQuery({ query: "billie eilish", field: "more" }))
        dispatch(
            getSongsByQuery({ query: "bruce springsteen", field: "favoriteArtists" })
        )
        dispatch(
            getSongsByQuery({ query: "pinguini tattici nucleari", field: "related" })
        )
    }, [])
    return (
        <>
            <Col className="main" sm={12} md={9} lg={8}>
                <nav></nav>
                <Jumbotron />
                <div className="recent__container p-3">
                    <h3>Buon pomeriggio</h3>
                    <Row className="recent w-100 g-0">
                    </Row>
                </div>
                <div className="favorites p-3">
                    <h3>
                        Altro da
                        <span className="favorites__container text-capitalize"> {more.length > 0 && more[0].artist.name}</span>
                    </h3>
                    <Row className="favorites__results gy-2 justify-content-center">
                        {more.map(canzone => <Card key={canzone.id} song={canzone} />)}
                    </Row>
                </div>
                <div className="shows p-3">
                    <h3>
                        I tuoi preferiti da
                        <span className="shows__container text-capitalize"> {fav.length > 0 && fav[0].artist.name}</span>
                    </h3>
                    <Row className="shows__results gy-2 justify-content-center">
                        {fav.map(canzone => <Card key={canzone.id} song={canzone} />)}
                    </Row>
                </div>
                <div className="liked p-3">
                    <h3>
                        Perche' ti piace
                        <span className="liked__container text-capitalize"> {related.length > 0 && related[0].artist.name}</span>
                    </h3>
                    <Row className="liked__results gy-2 justify-content-center">
                        {related.map(canzone => <Card key={canzone.id} song={canzone} />)}
                    </Row>
                </div>
            </Col>

        </>
    )
}
