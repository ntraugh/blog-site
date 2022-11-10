import React from 'react'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




const Posts = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get("/posts")
            .then(res => {
                console.log(res)
                setPosts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const deletePost = (id) => {
        axios.delete(`/delete/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        window.location.reload()
    
        

    }
    
    
  return (
    <div style={{width: "90%", textAlign: "center", margin: "auto auto"}}>
        <h1>Posts</h1>
        {posts ? (
            <>
                {posts.map((post) => {
                    return (
                        <div key={post._id} style={{border: "solid black 1px", borderRadius: "4px", marginBottom: "1rem", padding: "1rem"}}>
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Button variant="outline-primary" style={{width: "100%", marginRight: "1rem"}}>Update</Button>
                                <Button 
                                variant="outline-danger" 
                                style={{width: "100%", marginRight: "1rem"}}
                                onClick={() => deletePost(post._id)}>Delete</Button>
                            </div>
                        </div>
                    )
                })}
            
            </>
        ) : ""}
        <Button 
        style={{width: "100%", margin: "0 0 1rem"}}
        variant="outline-primary" 
        onClick={() => navigate("create")}>Back</Button>
    </div>
  )
}

export default Posts