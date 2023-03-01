import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ArtistReducerInitialState = {
    data: {} as Artist,
    popular: [],
    albums: [],
    loading: true,
    error: null,
}


export const getArtistById = createAsyncThunk(
    "artist/getArtistById",
    async (id: string) => {
        try {
            const res = await fetch(
                `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`
            )
            let artist = await res.json()
            let resTracks = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`);
            let { data: tracks } = await resTracks.json();
            return { ...artist, tracks }

        } catch (error) {
            console.error(error)
        }
    }
)

export const getPopularAndAlbums = createAsyncThunk(
    "artist/getPopularAndAlbums",
    async (id: number) => {
        try {
            let resTracks = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`);
            let { data: tracks }: { data: Song[] } = await resTracks.json();
            let sorted = [...tracks]
            sorted.sort((a, b) => a.rank - b.rank); //mette in ordine le canzoni per popolarita'
            let popular: Album[] = [];
            sorted.forEach((song) => {
                //per ogni canzone
                if (!popular.map((a) => a.title).includes(song.album.title)) {
                    //se il titolo della canzone non e' gia' nell'array
                    popular.push(song.album); //inserisci la canzone nell'array
                } //questo if crea un'array di canzoni da album unici (senza doppioni)
            });
            popular = popular.slice(0, 4); //taglia da 0 a 4 canzoni
            let allAlbums = tracks.filter((song) => song.artist.id === id).map((song) => song.album);
            let albums: Album[] = [];
            allAlbums.forEach((album) => {
                if (!albums.map((a) => a.title).includes(album.title)) {
                    albums.push(album);
                }
            });
            return { popular, albums }

        } catch (error) {
            console.error(error)
        }
    }
)

const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArtistById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(
                getArtistById.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.data = action.payload
                }
            )
            .addCase(getPopularAndAlbums.pending,
                (state, action) => {
                    state.loading = true
                })
            .addCase(getPopularAndAlbums.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.popular = action.payload!.popular
                    state.albums = action.payload!.albums
                })
    },
})

export default artistSlice.reducer

