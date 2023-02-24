import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import "./Jumbotron.scss"
export const Jumbotron = () => {
    const jt = useSelector((state:RootState)=> state.home.jumbotron)
    return (<>
        <div className="adv row align-items-center d-sm-none d-md-flex ">

            <img
                className="adv__cover col-2 px-0 me-3"
                src={jt.album?.cover_xl}
            />
            <div className="adv__info col-9">

                <h2 className="text-white">{jt.title}</h2>
                <p className="text-white clickable">{jt.artist?.name}</p>
                <p className="text-white clickable">{jt.album?.title}</p>
                <button className="adv__button play-btn fw-bold me-2">Play</button>
                <button className="adv__button save-btn fw-bold">Save</button>
            </div>
        </div> </>)
}