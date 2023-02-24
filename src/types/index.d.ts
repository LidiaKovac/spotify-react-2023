//GENERAL API INTERFACES
interface Song {
    album: Album
    artist: Artist
    id: number
    link: string
    name: string
    picture: string
    picture_big: string
    picture_medium: string
    picture_small: string
    picture_xl: string
    tracklist: string
    type: string
    duration: number
    explicit_content_cover: number
    explicit_content_lyrics: number
    explicit_lyrics: boolean
    id: number
    link: string
    md5_image: string
    preview: string
    rank: number
    readable: boolean
    title: string
    title_short: string
    title_version: string
    type: string
}

interface Album {
    cover: string
    cover_big: string
    cover_medium: string
    cover_small: string
    cover_xl: string
    id: number
    md5_image: string
    title: string
    tracklist: string
    type: string
}

interface Artist {
    id: number
    link: string
    name: string
    picture: string
    picture_big: string
    picture_medium: string
    picture_small: string
    picture_xl: string
    tracklist: string
    tracks: Song[]
    type: string
}
//REDCUER TYPES 

interface DefaultReducer {
    loading: boolean
    error: string | null
}

interface HomeReducerInitialState extends DefaultReducer {
    jumbotron: Song
    recent: Array<Song>
    more: Array<Song>
    favoriteArtists: Array<Song>
    related: Array<Song>
}

interface HomeReducerAction { //payload structure
    field: "jumbotron" | "favoriteArtists" | "more" | "recent"| "related" 
    value: Song | Array<Song>
}

interface ArtistReducerInitialState extends DefaultReducer{
    data: Artist
    popular: Album[]
    albums: Album[]
}