import { useEffect } from 'react';
import Like from '../../components/Like';
import PhotoItem from '../../components/PhotoItem';
import './index.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import { getAllPhotos, likePhoto } from '../../slices/photoSlice';

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  const handleLike = (photo) => {
    dispatch(likePhoto(photo._id));
    resetMessage();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div id='home'>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <Like photo={photo} user={user} handleLike={handleLike} />
            <Link className='btn' to={`/photos/${photo._id}`}>
              View
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className='no-photos'>
          No photos yet.{' '}
          <Link to={`/users/${user._id}`}> Post one right now! </Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
