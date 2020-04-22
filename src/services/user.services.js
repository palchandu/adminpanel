
import config from '../config/config';
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('userData'),
    'request-type'  : 'private'
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

function removeCategory(cateId){
    return new Promise((resolve,reject)=>{
        axios.get(config.api_path+'/v2/category/remove_category/'+cateId,{headers:headers}).then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error)
        })
    })
    
}
function updateCategory(category,catId){
    return new Promise((resolve,reject)=>{
        var payload={
            "name":category,
            "_id":catId
        }
        console.log('payload',payload);
        axios.post(config.api_path+'/v2/category/update_category',payload,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}

function deletePost(post_id){
    return new Promise((resolve,reject)=>{
        var payload={
            "post_id":post_id,
        }
        axios.post(config.api_path+'/v2/posts_comments/post_delete',payload,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}

function getWebsiteInfo(){
    return new Promise((resolve,reject)=>{
        axios.get(config.api_path+'/v2/mywebsite/get_all_info',{headers:headers}).then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error)
        })
    })
}

function manageSocialIcons(data){
    return new Promise((resolve,reject)=>{
        axios.post(config.api_path+'/v2/mywebsite/manage_social_icons',data,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}

function manageFooterData(data){
    return new Promise((resolve,reject)=>{
        axios.post(config.api_path+'/v2/mywebsite/manage_footer_data',data,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}

function manageHeaderData(data){
    return new Promise((resolve,reject)=>{
        axios.post(config.api_path+'/v2/mywebsite/manage_website_logo',data,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}
function manageWorkTitle(data){
    return new Promise((resolve,reject)=>{
        axios.post(config.api_path+'/v2/mywebsite/manage_work_title',data,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}
function manageWorkIntro(data){
    return new Promise((resolve,reject)=>{
        axios.post(config.api_path+'/v2/mywebsite/manage_work_intro',data,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}
function manageWorkAdd(data){
    return new Promise((resolve,reject)=>{
        axios.post(config.api_path+'/v2/mywebsite/manage_work_addworks',data,{headers:headers}).then(function(response){
           resolve(response);
        }).catch(function(error){
            reject(error)
        })
    })
}
function manageWorkDelete(data){
    return new Promise((resolve,reject)=>{
        axios.post(config.api_path+'/v2/mywebsite/delete_work',data,{headers:headers}).then(function(response){
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
    updatePosts,
    removeCategory,
    updateCategory,
    deletePost,
    getWebsiteInfo,
    manageSocialIcons,
    manageFooterData,
    manageHeaderData,
    manageWorkTitle,
    manageWorkIntro,
    manageWorkAdd,
    manageWorkDelete
}