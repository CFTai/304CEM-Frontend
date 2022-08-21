import React, { useState, useRef} from "react";
import Cookies from "universal-cookie";
import axios from 'axios';

const CommentSection = (productId) => {
    const [commentValue, setCommentValue] = useState("");

    const textRef = useRef(null);
    const containerRef = useRef(null);

    const onChange = (e) => {
        setCommentValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            "content": commentValue,
            "rating": 5
        }
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "post",
        url: process.env.REACT_APP_API_URL + 'product/' + productId.productId + '/comment/',
        data: body,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    // call post api
    axios(configuration)
      .then((result) => {
        if(result.status === 201) {
            window.location.reload();
        }
      })
      .catch((error) => {
        error = new Error();
      });
    }

    return (
        <div className="CommentSection">
            <form
                onSubmit={onSubmit}
                ref={containerRef}
                className={"comment-box"}
            >
                <div className="header">
                    <div className="user">
                        <img
                            src="https://dummyimage.com/400x400/8873ff/ffffff"
                            art="User avater"
                        />
                        <textarea 
                            ref={textRef}
                            onChange={onChange}
                            className="comment-field"
                            placeholder="What are your thoughts"
                            value={commentValue}
                            name="comment"
                            id="comment"
                        />
                    </div>
                </div>

                <div className="actions">
                    <button variant="primary" type="submit" disabled={commentValue.length < 1}>
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentSection;