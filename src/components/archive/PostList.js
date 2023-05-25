import { useState, useEffect } from "react"

export const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/read/df')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(err =>{
                console.log(err)
            })
    },[])
    console.log(posts)
    return(
        <div>
            <ul>
                {
                    posts.map(post => {
                        return <li>{post.MIDDLE}</li>
                    })
                }
            </ul>
        </div>
    )
}