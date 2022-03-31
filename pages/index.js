import { Fragment, useState, useEffect, useRef } from "react";
import axios from 'axios';

import Card from "./UI/Card";
import AddComment from "./Comments/AddComment";
import CommentsList from "./Comments/CommentsList";

const App = () => {
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  const [commentsList, setCommentsList] = useState([]);

  const fetchComment = async () => {
    const response = await axios.get("http://api.comment.com/v1/comments");

    if (response.status === 200) {
      console.log(response.data.comments)
      setCommentsList(response.data.comments);
    }
  }

  useEffect(() => {
    fetchComment();
  }, []);

  const commentHandler = () => {
    fetchComment();
  };

  const addCommentHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    const data = {
      name: enteredName,
      body: enteredComment,
      comment_level: 1,
      reply_id: 0
    };

    const response = await axios
      .post("http://api.comment.com/v1/comments", data);

    if (response.status === 200) {
      fetchComment();
    }

    // not advisable but should suffice for now
    nameInputRef.current.value = "";
    commentInputRef.current.value = "";
  };

  return (
    <Fragment>
      <Card>
        <h3>POST</h3>
        <p>What is on your mind?</p>
      </Card>
      <Card>
        <h3>COMMENT SECTION</h3>
        <AddComment onSubmit={addCommentHandler} nameInputRef={nameInputRef} commentInputRef={commentInputRef} onAddComment={commentHandler} />
        <CommentsList comments={commentsList} onAddReply={commentHandler} />
      </Card>
    </Fragment>
  );
};

export default App;
