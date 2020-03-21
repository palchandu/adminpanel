
import config from '../config/config';
import axios from 'axios';
const headers = {
    'Content-Type': 'application/json',
    'x-access-token': JSON.parse (sessionStorage.getItem('userData'))
  }

function login(email,password){
    return new Promise((resolve,reject)=>{
        var payload={
            "email":email,
            "password":password
        }
        axios.post(config.api_path+'/v2/user/login',payload).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}

function categoryList(){
    return new Promise((resolve,reject)=>{
        axios.get(config.api_path+'/v2/category/list_category',{headers:headers}).then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error)
        })
    })
}

function addCategory(category,created_by){
    return new Promise((resolve,reject)=>{
        var payload={
            "name":category,
            "created_by":created_by
        }
        axios.post(config.api_path+'/v2/category/add_category',payload,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}
function addPosts(data){
    return new Promise((resolve,reject)=>{
        axios.post(config.api_path+'/v2/posts_comments/add_post',data,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}

function imageList(){
    return new Promise((resolve,reject)=>{
        axios.get(config.api_path+'/v2/common/images').then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error)
        })
    })
}

function postList(){
    return new Promise((resolve,reject)=>{
        axios.get(config.api_path+'/v2/posts_comments/all_posts',{headers:headers}).then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error)
        })
    })
    
}

function singlePost(title){
    return new Promise((resolve,reject)=>{
        axios.get(config.api_path+'/v2/posts_comments/post_detail/'+title,{headers:headers}).then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error)
        })
    })
    
}
function updatePosts(data){
    return new Promise((resolve,reject)=>{
        axios.post(config.api_path+'/v2/posts_comments/post_update',data,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}

export default {
    login,
    categoryList,
    addCategory,
    addPosts,
    imageList,
    postList,
    singlePost,
    updatePosts
}