import axios from 'axios'

export const splitArray = (array) => {
    const half = Math.ceil(array.length / 2);
    return [array.slice(0, half), array.slice(half)];

}

const parseURI = async (d) => {
    var reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
    reader.readAsDataURL(d);          /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
    return new Promise((res,rej)=> {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
      reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
        res(e.target.result)
      }
    })
  } 
  
  export const getDataBlob = async (url) => {
    var res = await fetch(url);
    var blob = await res.blob();
    var uri = await parseURI(blob);
    //setImage(uri)
    //reduce_image_file_size(uri)
    return uri;
  }

  export const reduce_image_file_size = async (base64Str, MAX_WIDTH = 900, MAX_HEIGHT = 900) => {
    let resized_base64 = await new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
            let canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width
                    width = MAX_WIDTH
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height
                    height = MAX_HEIGHT
                }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL()) // this will return base64 image results after resize
        }
    });
    // ommit data:image/jpeg;base64, from resized_base64
    let reduced_base64 = resized_base64.replace(/^data:image\/png;base64,/, '')
    reduced_base64.replace(/^data:image\/jpeg;base64,/, '')

    return reduced_base64;
}

export const putImage = async (url, playlistID, token) => {

    const uri = await getDataBlob(url)
    const reduced_base64 = await reduce_image_file_size(uri)
    
    console.log(reduced_base64)
    

    const options = {
        method: 'PUT',
        url: `https://api.spotify.com/v1/playlists/${playlistID}/images`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "image/jpeg",
        },
        contentType: "image/jpeg",
        data: reduced_base64
    }

    console.log("putImage")
    const res = await axios(options);
    console.log(res.data)

    
}