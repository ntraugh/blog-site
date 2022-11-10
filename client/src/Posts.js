import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'




const Posts = () => {
    useEffect(() => {
        axios.get("/posts")
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])
    
    
  return (
    <div style={{width: "90%", textAlign: "center", margin: "auto auto"}}>
        <h1>Posts</h1>
    </div>
  )
}

export default Posts