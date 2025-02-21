import React, { useState } from 'react';
import api from '../../constants/axios';
import axios from 'axios';


const Comment = ({blogId, userId}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {

        try {
            const response = await axios.post(`https://maternitycare.azurewebsites.net/api/blogs/${blogId}/users/${userId}/comments`, {
              content: newComment
            });
            console.log(response.data);
            setComments([{ id: Date.now(), user: response.data.user, text: newComment }, ...comments]);
            setNewComment('');
          } catch (error) {
            console.log(error.response);
          }
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Post</button>
      </form>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.user}:</strong> {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
