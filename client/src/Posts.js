import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from "react-bootstrap/Modal"


const Posts = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [show, setShow] = useState(false)
    const [updatedPost, setUpdatedPost] = useState({})

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true) 
    

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
    
    const updatePost = (post) => {
        setUpdatedPost(post)
        handleShow()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdatedPost((prev) => {
            return {
                ...prev, 
                [name]: value
            
            }
        })
    }

    const saveUpdatedPost = () => {
        axios.put(`/update/${updatedPost._id}`, updatedPost)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        handleClose()
        window.location.reload()

    }

    
  return (
    <div style={{width: "90%", textAlign: "center", margin: "auto auto"}}>
        <h1>Posts</h1>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group >
                        <Form.Control 
                        style={{marginBottom: "1rem"}} 
                        placeholder='title' 
                        name='title' 
                        value={updatedPost.title ? updatedPost.title: ""} 
                        onChange={handleChange}/>

                        <Form.Control 
                        placeholder='description' 
                        name='description' 
                        value={updatedPost.description ? updatedPost.description: ""}
                        onChange={handleChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={saveUpdatedPost}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        {posts ? (
            <>
                {posts.map((post) => {
                    return (
                        <div key={post._id} style={{border: "solid black 1px", borderRadius: "4px", marginBottom: "1rem", padding: "1rem"}}>
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Button 
                                onClick={() => updatePost(post)} 
                                variant="outline-primary" 
                                style={{width: "100%", marginRight: "1rem"}}>Update</Button>
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
        onClick={() => navigate("/create")}>Back</Button>
    </div>
  )
}

export default Posts