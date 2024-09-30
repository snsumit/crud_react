import React from 'react'
import { useEffect , useState } from 'react'
import { deleteData, getPostData } from '../services/GetPostData'
import Form from './Form'


const Post = () => {
   const [data,setData] = useState([])
   const [updatedApiData , setUpdatedApiData] = useState({})


   const getData = async () =>{
      try {
          const Postdata  = await getPostData();
   
          setData(Postdata.data);
      } catch (error) {
         console.log(error)
         
      }
   }
   
    useEffect(()=>{
       getData()
    },[])

 
   const handleDeletePost = async (id) =>{
       try {
           const response  = await deleteData(id);
           if(response.status === 200){
             const newUpdatedData = data.filter((currPost) => currPost.id !== id );
             setData(newUpdatedData);
           }
       } catch (error) {
           console.log(error);
       }
   }

   const handleUpdatePost = (currPost) => {
     setUpdatedApiData(currPost)
   }

  return (
    <>
      <section>
           <Form  data={data} setData={setData} updatedApiData={ updatedApiData} setUpdatedApiData={setUpdatedApiData}/>
      </section>
    <section>
      

         <ul className='grid grid-three-cols'>
            {
                data.map((currPost)=>{
                    return(
                        <li class="cookieCard" key={currPost.id}>
                        <p class="cookieHeading">{currPost.title}</p>
                        <p class="cookieDescription">{currPost.body.slice(0,100)}</p>
                        <div className='btn'>
                        <button class="acceptButton" onClick={() => handleUpdatePost(currPost) }>Edit</button>
                        <button class="acceptButton" onClick={() =>handleDeletePost(currPost.id)}>Delete</button>
                        </div>
                      </li>
                      
                        
               
                        
                      
                    )
                })
            }
         </ul>
    </section>
    </>
  )
}

export default Post
