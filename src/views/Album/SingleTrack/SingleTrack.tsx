import { FC } from "react"
import { Col, Row } from "react-bootstrap"
import "./SingleTrack.scss"
interface SingleTrackProps {
  song: Song
  index: number
}
export const SingleTrack: FC<SingleTrackProps> = ({ song, index }) => {
  return (
    <Row className="tracks__table-single clickable mx-3 py-3 justify-content-between text-opaque-white">
      <Col sm={1}>{index}</Col>
      <Col sm={5}>{song.title}</Col>
      <Col sm={4}>{song.rank}</Col>
      <Col sm={1}>{song.duration}</Col>
    </Row>
  )
}
