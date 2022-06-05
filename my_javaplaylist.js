
const getAuth = async () => {
    const clientID = '';
    const clientSecret = '';
    const encodedString = btoa(clientID + ':' + clientSecret);
    const response = await fetch('https://accounts.spotify.com/api/token',
        {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encodedString}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'

        }
    );
    let token = await response.json();
    //console.log(token)
    return token.access_token
}

const loadToken = async () => {
    const token = await getAuth();
    return token
}

const getPlaylist = async () => {
    const token = await loadToken();
    let response = await fetch (`https://api.spotify.com/v1/playlists/0bYbF3NBwNft5QfB8JPIJC`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    
    response = await response.json();
    track_list = response.tracks.items
    //console.log(response)
    return track_list

}

const getSong = async (num) => {
    const my_song = await getPlaylist();
    let new_num = num

    console.log(my_song[num])
    my_track = my_song[new_num].track.preview_url;
    my_image = my_song[new_num].track.album.images[0]
    if (my_song[num].track.preview_url === null){
        console.log('Looks like this is not here')

    }

    let audioobj = new Audio(my_track)
    create_image(my_image.url, my_image.height, my_image.width, 'my_img', 'my_idimg' + new_num, audioobj);
    
}

const create_image = async (src, height, width, classs, id, aud) => {
    let my_image = document.createElement('IMG')
    my_image.src = src;
    my_image.height = height/2;
    my_image.width = width/2;
    my_image.className = classs;
    my_image.id = id
    my_image.aud = aud
    let is_playing = false

    document.getElementById('imagerow').appendChild(my_image);
    const eventlist = document.getElementById(id)
    eventlist.addEventListener("click", function (my_clicks) {
        console.log(my_clicks);
    
        let target = my_clicks.target;
        
        if (target.matches('img')){
            if (is_playing === false){
                console.log(aud)
                aud.play();
                is_playing = true
            } else {
                aud.pause();
                is_playing = false
            }

            
        }
    })
    
    eventlist.addEventListener("mouseover", function (my_mouseover) {
        console.log('my mouseover')
        my_image.style.filter = 'grayscale(100%)';
        my_image.width = width/2 + 50;
        my_image.height = height/2 + 50;
    }
    )

    eventlist.addEventListener("mouseout", function (my_mouseout) {
        my_image.style.filter = 'grayscale(0%)';
        my_image.width = width/2
        my_image.height = height/2
    })
}

for (i = 0; i < 10; i++){
    getSong(i)
}

