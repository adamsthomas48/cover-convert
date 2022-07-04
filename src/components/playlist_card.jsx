
export const PlaylistCard = (props) => { 

    

    return(
    <div>
        
        <img src={props.playlist.images[0].url} width="200px" height="200px"/>
        <h2 className="h3">{props.playlist.name}</h2>

    </div>)
}