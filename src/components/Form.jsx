import React, {useEffect, useState } from 'react'
import { addData, updateData } from '../services/GetPostData';

const Form = ({data , setData , updatedApiData , setUpdatedApiData}) => {
   const [newData , setNewData] = useState({
    title:"",
    body:"",
   })

   useEffect(()=>{
      updatedApiData && setNewData({
         title: updatedApiData.title || " ",
         body: updatedApiData.body || " "
      })
   },[updatedApiData])


   const isEmpty =  Object.keys(updatedApiData).length === 0;
   console.log(isEmpty);


    const handleInputChange = (e) =>{
       const name = e.target.name;
       const value = e.target.value;

       setNewData((prev) => {
                 return{
                    ...prev,
                    [name]:value,
                             
                 }
            
       })
    
   }

   const addPostData = async () =>{
      try {
         const response = await addData(newData);
         if(response.status === 201){
            setData([...data , response.data])
            setNewData({ title:" ",body:" ",})
         }
      } catch (error) {
         console.log(error)
      }
     
   }

   const updatePostData = async (id,post) =>{
      try {
         const response  = await updateData(id,post);
         console.log(response)
         if(response.status === 200){
         setData((prev)=>{
            return prev.map((currPost)=>{
                return currPost.id === response.data.id ? response.data : currPost; 
            })

         })
         console.log(data)

         setNewData({title:"" , body:""});
         setUpdatedApiData({})
         }
      }
      catch (error) {
       console.log(error)  
      }
   }

 
   const handleFormSubmit = (e) =>{
       e.preventDefault();
       const action  = e.nativeEvent.submitter.value;
       if(action == "Add"){
         addPostData();
       }else if(action === "Edit"){
         updatePostData(updatedApiData.id , newData);
       }
       
   }
 
 
    return (
  <form onSubmit={handleFormSubmit}>
<div className='inputGroup' >
    <label htmlFor="title"></label>
    <input type="text" 
    autocomplete="off" 
    id='title'
    name='title'
    placeholder='Add Title'
    value={newData.title}
    onChange={handleInputChange}
    
    
    />
     <label htmlFor="body"></label>
    <input type="text" 
    autocomplete="off" 
    id='body'
    name='body'
    placeholder='Add description'
    value={newData.body}
    onChange={handleInputChange}
    
    
    />
    <button className='acceptButton' type='submit' value={isEmpty ? "Add" :"Edit"}>{isEmpty ? "Add" : "Edit"}</button>
   
</div>
</form>
  )
}

export default Form
