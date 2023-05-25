import { ChangeEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
    setVolume,
    setCurrentTime,
    setPlaying,
    increaseCurrentTime,
} from "../../app/actions/player/player"
import {
    Heart,
    HeartFill,
    PlayCircleFill,
    PauseCircleFill,
    SkipEndFill,
    SkipStartFill,
    Repeat,
    Shuffle,
} from "react-bootstrap-icons"
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import "./Player.scss"
export const Player = () => {
    let interval: NodeJS.Timer
    const dispatch = useAppDispatch()
    const selected = useSelector((state: RootState) => state.player.selected)
    const { playing, volume, currentTime } = useSelector(
        (state: RootState) => state.player
    )
    const [audio, setAudio] = useState<HTMLAudioElement>(
        new Audio(selected.preview)
    )
    useEffect(() => {
        return clearInterval(interval)
    })
    useEffect(() => {
        setAudio((prev) => {
            if (playing) {
                prev.play()
            } else {
                prev.pause()
                clearInterval(interval)
            }
            return prev
        })
        if (playing) {
            clearInterval(interval)

            interval = setInterval(() => {
                dispatch(increaseCurrentTime(""))
            }, 1000)
        } else clearInterval(interval)
    }, [playing])
    useEffect(() => {
        setAudio((prev) => {
            prev.volume = volume / 100
            return prev
        })
    }, [volume])
    useEffect(() => {
        setAudio((prev) => {
            prev.currentTime = currentTime
            return prev
        })
    }, [currentTime])
    useEffect(() => {
        setAudio((prev) => {
            prev.src = selected.preview
            prev.currentTime = 0
            return prev
        })
        dispatch(setCurrentTime(0))
        clearInterval(interval)
    }, [selected.preview])

    const changeVolume = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setVolume(ev.target.value))
    }
    const changeCurrentTime = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentTime(ev.target.value))
    }
    return (
        <>
            {" "}
            <div className="player flex-row position-fixed d-sm-none d-md-flex justify-content-between">
                <div className="player__track d-flex align-items-center">
                    <img
                        src={selected.album?.cover_xl}
                        alt={selected.album?.title}
                        className="player__track-cover"
                    />
                    <div className="player__track-info ms-3 me-5 my-auto">
                        <div className="player__track-title text-truncate text-white">
                            {selected.title}
                        </div>
                        <div className="player__track-artist">{selected.artist?.name}</div>
                    </div>
                    <div className="player__track-like">
                        <Heart />
                        <HeartFill className="d-none" />
                        {/* <i className="bi bi-heart-fill d-none"> </i> */}
                    </div>
                </div>
                <div className="player__main my-auto">
                    <div className="player__main-controls d-flex justify-content-center">
                        <button className="player-btn my-auto shuffle">
                            <Shuffle />
                        </button>
                        <button className="player-btn my-auto previous">
                            <SkipStartFill />
                        </button>
                        <button
                            className="player-btn my-auto play-btn"
                            onClick={() => dispatch(setPlaying(!playing))}
                        >
                            {playing ? <PauseCircleFill /> : <PlayCircleFill />}
                        </button>
                        <button className="player-btn my-auto next">
                            <SkipEndFill />
                        </button>
                        <button className="player-btn my-auto repeat">
                            <Repeat />
                        </button>
                    </div>
                    <div className="player__main-progress-bar">
                        <input
                            type="range"
                            value={currentTime}
                            min="0"
                            max="30"
                            className="player__progress-bar"
                            onChange={changeCurrentTime}
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
                        value={volume}
                        id="volume"
                        onChange={changeVolume}
                    />
                </div>
            </div>
            <div className="player--mobile position-fixed d-block d-md-none"></div>{" "}
        </>
    )
}
