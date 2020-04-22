import configFile from '../config/config';
import axios, { post } from 'axios';
function userId(){
    return JSON.parse (sessionStorage.getItem('userId'));
}

function fileUpload(file){
    const url = configFile.api_path+'/v2/common/upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

export default{
    userId,
    fileUpload
}