import "./post.css";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
    // need to move everything from feed
    <div></div>


    /*
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
        const res = await axios.get(`/api/users?userId=${post.userId}`);
        setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
        axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };
    return (
        <div className="post">
        <div className="postWrapper">
            <div className="postTop">
            <div className="postTopLeft">
                <Link to={`/api/profile/${user.username}`}>
                <img
                    className="postProfileImg"
                    src={user.profilePicture}
                    alt=""
                />
                </Link>
                <span className="postUsername">{user.username}</span>
                <span className="postDate">{post.createdAt}</span>
            </div>
            <div className="postTopRight">
                <QuestionMarkIcon />
            </div>
            </div>
            <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={"/api/post/" + post.img} alt="" />
            </div>
            <div className="postBottom">
            <div className="postBottomLeft">
                <QuestionMarkIcon onclick={likeHandler} />
                <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
            </div>
            </div>
        </div>
        </div>
        */
    );
}
export default Post;