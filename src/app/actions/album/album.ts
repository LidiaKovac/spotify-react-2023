import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
const initialState: AlbumReducerInitialState = {
    loading: true,
    error: "",
    data: {} as Album,
    related: [] as Album[],
}

export const getAlbumById = createAsyncThunk(
    "album/getAlbumById",
    async (id: string) => {
        try {
            const res = await fetch(
                `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
            )
            let album = await res.json()
            album.tracks = album.tracks.data
            let resTracks = await fetch(
                `https://striveschool-api.herokuapp.com/api/deezer/artist/${album.artist.id}/top?limit=50`
            )
            let { data: songs }: { data: Song[] } = await resTracks.json() //isolo la proprieta' "data"
            let allAlbums = songs
                .map((song) => song.album) //creo un array dei soli album
                .filter((al) => al.title.toLowerCase() !== album.title.toLowerCase()) //elimino l'album della pagina che stiamo vedendo
            let uniqueAlbums = [] as Album[]
            allAlbums.forEach((album) => {
                //creiamo un array di album unici
                if (!uniqueAlbums.map((a) => a.title).includes(album.title)) {
                    uniqueAlbums.push(album)
                }
            })
            return { album, uniqueAlbums }
        } catch (error) {
            console.error(error)
        }
    }
)

const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAlbumById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAlbumById.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload?.album
                state.related = action.payload?.uniqueAlbums!
            })
    },
})

export default albumSlice.reducer
