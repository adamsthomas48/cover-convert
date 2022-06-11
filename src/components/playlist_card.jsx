
export const PlaylistCard = (props) => { 

    

    return(
    <div>
        <p>{props.playlist.name}</p>
        <p>{props.playlist.id}</p>
        <img src={props.playlist.images[0].url} width="200px" height="200px"/>

    </div>)
}