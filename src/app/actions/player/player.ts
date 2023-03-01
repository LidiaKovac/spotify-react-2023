import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: PlayerReducerInitialState = {
    selected: {} as Song,
    volume: 10,
    playing: false,
    loading: false,
    currentTime: 0,
    error: ""
}

export const getSongsByAlbumId = createAsyncThunk(
    "player/getSongsByAlbumId",
    async (id: number) => {
        try {
            let data: Song | Song[]
            const res = await fetch(
                `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
            )
            let album = await res.json()
            album.tracks = album.tracks.data
            return album.tracks[0]
        } catch (error) {
            console.error(error)
        }
    }
)


const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setCurrentTime: (state, action) => {
            return {
                ...state,
                currentTime: action.payload
            }
        },
        increaseCurrentTime: (state, action) => {
            let currCopy = state.currentTime
            return {
                ...state,
                currentTime: currCopy+= 1
            }
        },
        setVolume: (state, action) => {
            return {
                ...state,
                volume: action.payload
            }
        },
        setPlaying: (state, action) => {
            return {
                ...state,
                playing: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSongsByAlbumId.pending, (state, action) => {
                state.loading = true
            })
            .addCase(
                getSongsByAlbumId.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.selected = action.payload
                }
            )
    },
})
export const { setCurrentTime, setVolume, setPlaying, increaseCurrentTime } = playerSlice.actions;

export default playerSlice.reducer

