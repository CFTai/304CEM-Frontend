import React, { useState, useRef} from "react";

const CommentSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const outerHeight = useRef(46);
    const textRef = useRef(null);
    const containerRef = useRef(null);

    const onChange = (e) => {
        setCommentValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(commentValue);
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
                    </div>
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

                <div className="actions">
                    <button type="submit" disabled={commentValue.length < 1}>
                        Respond
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentSection;