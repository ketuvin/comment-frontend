import { Fragment, useState, useEffect } from "react";
import axios from 'axios';

import Card from "./UI/Card";
import AddComment from "./Comments/AddComment";
import CommentsList from "./Comments/CommentsList";

const App = () => {
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

  const addCommentHandler = () => {
    fetchComment();
  };

  return (
    <Fragment>
      <Card>
        <h3>POST</h3>
        <p>What is on your mind?</p>
      </Card>
      <Card>
        <h3>COMMENT SECTION</h3>
        <AddComment onAddComment={addCommentHandler} />
        <CommentsList comments={commentsList} onAddReply={addCommentHandler} />
      </Card>
    </Fragment>
  );
};

export default App;
