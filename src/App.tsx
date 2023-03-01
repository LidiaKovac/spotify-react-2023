import "./index.scss"
import { Homepage } from "./views/Homepage/Home"

import { Row } from "react-bootstrap"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarLeft } from "./components/SidebarLeft/SidebarLeft"
import { Player } from "./components/Player/Player"
import { Artist } from "./views/Artist/Artist"
import { AlbumPage as Album } from "./views/Album/Album"

function App() {

  return (
    <BrowserRouter>
      <div className="spotify__container row g-0">
        <SidebarLeft />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/album/:id" element={<Album />} />
        </Routes>

        <aside
          id="friends__area"
          className="bg-primary col col-md-2 d-md-none d-lg-block"
        ></aside>
      </div>

      <Player />
      <Row className="sidebar__area--mobile position-fixed d-flex d-md-none row justify-content-evenly align-items-center g-0">
        <div className="sidebar__icon text-center">
          <i className="bi bi-house-fill"> </i>
        </div>
        <div className="sidebar__icon text-center">
          <i className="bi bi-search"> </i>
        </div>
        <div className="sidebar__icon text-center">
          <i className="bi bi-collection-play-fill"> </i>
        </div>
      </Row>
    </BrowserRouter>
  )
}

export default App
