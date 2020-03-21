function userId(){
    return JSON.parse (sessionStorage.getItem('userId'));
}


export default{
    userId
}