import React, { useState, useRef} from "react";
import Cookies from "universal-cookie";
import axios from 'axios';

// const CommentSection = (productId) => {
//     const [commentValue, setCommentValue] = useState("");

//     const textRef = useRef(null);
//     const containerRef = useRef(null);


//     return (
        
//     )
// }

// export default CommentSection;

function CommentSection(props) {
    var CommentValue = ''
    const textRef = useRef(null);
    const containerRef = useRef(null);

    const onChange = (e) => {
        CommentValue = e.target.value
    }

    const onSubmit = (e) => {
        e.preventDefault()
        props.onCommentSubmit(CommentValue)
    }

    return (
        <div className="CommentSection">
            <form
                ref={containerRef}
                onSubmit={onSubmit}
                className={"comment-box"}
            >
                <div className="header">
                    <div className="user">
                        <img
                            src="https://dummyimage.com/400x400/8873ff/ffffff"
                            art="User avater"
                        />
                        <textarea 
                            onChange={onChange}
                            ref={textRef}
                            className="comment-field"
                            placeholder="What are your thoughts"
                            name="comment"
                            id="comment"
                        />
                    </div>
                </div>

                <div className="actions">
                    <button variant="primary" type="submit">
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentSection;