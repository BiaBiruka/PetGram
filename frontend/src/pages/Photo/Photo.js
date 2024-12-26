import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import './Photo.css';

import { uploads } from '../../utils/config';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';

import { getPhotoById, likePhoto, commentPhoto } from '../../slices/photoSlice';
import PhotoItem from '../../components/PhotoItem';
import Like from '../../components/Like';

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(likePhoto(photo._id));
    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };
    dispatch(commentPhoto(commentData));
    setCommentText('');
    resetMessage();
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div id='photo'>
      <PhotoItem photo={photo} />
      <Like photo={photo} user={user} handleLike={handleLike} />
      <div className='message-container'>
        {error && <Message msg={message} type='error' />}
        {message && <Message msg={message} type='success' />}
      </div>
      <div className='comments'>
        <h3>Comments: {photo?.comments?.length}</h3>
        <form onSubmit={handleComment}>
          <input
            type='text'
            placeholder='Comment yout thoughts!'
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText || ''}
          />
          <input type='submit' value='Comment' />
        </form>
        {photo.comments && (
          <>
            {photo.comments.length === 0 && <p>No comments yet.</p>}
            {photo.comments.map((comment) => (
              <div className='comment' key={comment.comment}>
                <div className='author'>
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userName}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
