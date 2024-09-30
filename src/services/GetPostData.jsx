import axios from "axios"

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

export const getPostData = async () =>{
   return await api.get("/posts")
}



export const deleteData = async (id) =>{
    return await api.delete(`/posts/${id}`);
}

export const addData = async (post)=>{
    return await api.post("/posts",post)
}

export const updateData = async (id , post) =>{
    return await api.put(`/posts/${id}`,post)
}