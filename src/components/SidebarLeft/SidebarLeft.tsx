import "./SidebarLeft.scss"
export const SidebarLeft = () => {
    return (<aside id="sidebar__area" className="bg-primary col col-2 col-lg-2 col-md-3 d-sm-none d-md-flex flex-column">
        <div className="menu__area">
            <div
                className="menu__single clickable d-flex px-4 py-2 fw-bold align-items-center"
                // onClick="window.location.assign('./index.html')"
            >
                <i className="bi bi-house-fill"></i>
                Home
            </div>
            <div className="menu__single clickable px-4 py-2 fw-bold">
                <a href="./search.html" className="d-flex align-items-center">
                    <i className="bi bi-search"></i>
                    Search
                </a>
            </div>
            <div className="menu__single clickable d-flex px-4 py-2 fw-bold align-items-center">
                <i className="bi bi-collection-play-fill"> </i>
                Library
            </div>
        </div>
        <div className="menu__manage-area mt-3">
            <div className="manage__command-single clickable d-flex px-4 py-2 fw-bold align-items-center text-light-grey">
                <i id="create-playlist" className="bi bi-plus-lg"> </i>
                Create new playlist
            </div>
            <div className="manage__command-single clickable d-flex px-4 py-2 fw-bold align-items-center text-light-grey">
                <i id="liked-songs" className="bi bi-heart-fill"> </i>
                Liked songs
            </div>
            <div className="manage__command-single clickable d-flex px-4 py-2 fw-bold align-items-center text-light-grey">
                <i id="saved-episodes" className="bi bi-bookmark-fill"> </i>
                Saved episodes
            </div>
        </div>
        <div className="playlist__area mt-4"></div>
    </aside>)
}