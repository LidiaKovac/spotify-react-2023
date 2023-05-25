import "./index.scss"
import { Homepage } from "./views/Homepage/Home"

import { Row } from "react-bootstrap"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarLeft } from "./components/SidebarLeft/SidebarLeft"
import { Player } from "./components/Player/Player"
import { Artist } from "./views/Artist/Artist"
import { AlbumPage as Album } from "./views/Album/Album"
import { ChangeEvent, FormEvent, useState } from "react"

function App() {
  const [fd, setFd] = useState(new FormData())
  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    let res = await fetch("https://striveschool-api.herokuapp.com/api/posts/63ff5c39f443aa00132286d3", {
      //qui l'id andra' sostituito con un id DINAMICO!!!!!
      method: "POST",
      body: fd,
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU5N2ZiY2ZlYzFjZjAwMTU1YjliMDkiLCJpYXQiOjE2Nzc0ODUyNzYsImV4cCI6MTY3ODY5NDg3Nn0.zZRcvWE_qpD6Gr06xfZqQlVkqzkyl5BJI30JsV9rMqc"
      }
    })
  }
  const handleFile = (ev: ChangeEvent<HTMLInputElement>) => {
    setFd((prev) => {
      prev.delete("post")
      prev.append("post", ev.target.files![0])
      return prev
    })
  }
  return (
    <BrowserRouter>
      <div className="spotify__container row g-0">
        <SidebarLeft />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/test" element={<>

            <form onSubmit={handleSubmit}>
              <input type='file' onChange={handleFile} />
              <button>SEND</button>
            </form>

          </>} />

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
