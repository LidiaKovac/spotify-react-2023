import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: HomeReducerInitialState = {
    jumbotron: {} as Song,
    recent: [] as Array<Song>,
    more: [] as Array<Song>,
    favoriteArtists: [] as Array<Song>,
    related: [] as Array<Song>,
    loading: true,
    error: null,
}


export const getSongsByQuery = createAsyncThunk(
    "home/getSongsByQuery",
    async ({ query, field }: { query: string, field: string }) => {
        try {
            let data: Song | Song[]
            const res = await fetch(
                `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
            )

            if (field === "jumbotron") {
                const { data: [first] } = await res.json()

                data = first
            } else {
                let { data: music }: { data: Song[] } = await res.json()
                data = music
                    .filter((song) => song.artist.name.toLowerCase() === query.toLowerCase())
                    .sort((a, b) => b.rank - a.rank)
                    .slice(0, 6);

            }
            return { field: field, value: data }
        } catch (error) {
            console.error(error)
        }
    }
)

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSongsByQuery.pending, (state, action) => {
                state.loading = true
            })
            .addCase(
                getSongsByQuery.fulfilled,
                (state, action) => {
                    state.loading = false
                    let field = action.payload?.field as keyof HomeReducerInitialState
                    switch (field) {
                        case "jumbotron":
                            state.jumbotron = action.payload?.value as Song
                            break
                        case "favoriteArtists":
                            state.favoriteArtists = action.payload?.value as Song[]
                            break
                        case "more":
                            state.more = action.payload?.value as Song[]
                            break
                        case "recent":
                            state.recent = action.payload?.value as Song[]
                            break
                        case "related":
                            state.related = action.payload?.value as Song[]
                            break
                        default:
                            break
                    }
                }
            )
    },
})

export default homeSlice.reducer

// export const homeReducer = (
//   state = initialState,
//   { type, payload }:
// ) => {
//   switch (type) {
//     case GET_SONG_BY_QUERY:
//       if (payload.field ?== "jumbotron") {
//         return {
//           ...state,
//           [payload.field]: [
//             ...(state[
//               payload.field as keyof HomeReducerInitialState
//             ] as Song[]),
//             ...(payload.value as Song[]),
//           ],
//         }
//       } else {
//         return {
//           ...state,
//           jumbotron: payload.value,
//         }
//       }
//     default:
//       return state
//   }
// }
