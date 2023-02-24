import "./Player.scss"
export const Player = () => {
    return (<>             <div className="player flex-row position-fixed d-sm-none d-md-flex justify-content-between">
        <div className="player__track d-flex align-items-center">
            <img
                src="https://e-cdns-images.dzcdn.net/images/cover/fd35c16caa5b1e4b52802efa419e18d9/250x250-000000-80-0-0.jpg"
                alt="Peach Scone"
                className="player__track-cover"
            />
            <div className="player__track-info ms-3 me-5 my-auto">
                <div className="player__track-title text-truncate text-white">
                    Peach Scone
                </div>
                <div className="player__track-artist">Hobo Johnson</div>
            </div>
            <div className="player__track-like">
                <i className="bi bi-heart"> </i>
                <i className="bi bi-heart-fill d-none"> </i>
            </div>
        </div>
        <div className="player__main my-auto">
            <audio
                src="https://cdns-preview-2.dzcdn.net/stream/c-2d60d523ed4d6551154a48bc419e5eed-5.mp3"
                className="d-none"
            ></audio>
            <div className="player__main-controls d-flex justify-content-center">
                <button className="player-btn my-auto shuffle">
                    <i className="bi bi-shuffle"> </i>
                </button>
                <button className="player-btn my-auto previous">
                    <i className="bi bi-skip-start-fill"> </i>
                </button>
                <button className="player-btn my-auto play-btn">
                    <i className="bi bi-play-circle-fill"> </i>
                </button>
                <button className="player-btn my-auto next">
                    <i className="bi bi-skip-end-fill"> </i>
                </button>
                <button className="player-btn my-auto repeat">
                    <i className="bi bi-repeat"> </i>
                </button>
            </div>
            <div className="player__main-progress-bar">
                <input
                    type="range"
                    // value="0"
                    min="0"
                    max="30"
                    className="player__progress-bar"
                />
            </div>
        </div>
        <div className="player__volume d-flex align-items-center">
            <div className="player__icon player__icon-mic">
                <i className="bi bi-mic-fill"> </i>
            </div>
            <div className="player__icon player__icon-queue">
                <i className="bi bi-view-stacked"> </i>
            </div>
            <div className="player__icon player__icon-devices">
                <i className="bi bi-speaker-fill"> </i>
            </div>
            <div className="player__icon player__icon-volume">
                <i className="bi bi-volume-down-fill"> </i>
            </div>
            <input
                className="input__volume"
                type="range"
                max="100"
                min="0"
                // value="100"
                id="volume"
            />
        </div>
    </div>
        <div className="player--mobile position-fixed d-block d-md-none"></div> </>)
}