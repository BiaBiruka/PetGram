import React, { useEffect } from 'react';
import './Search.css';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import PhotoItem from '../../components/PhotoItem';
import Like from '../../components/Like';
import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import { likePhoto, searchPhoto } from '../../slices/photoSlice';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage();
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhoto(search));
  }, [dispatch, search]);

  const handleLike = (photo) => {
    dispatch(likePhoto(photo._id));
    resetMessage();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div id='search'>
      {photos && photos.length < 1 ? (
        <h2 className='no-photos'>No results were found for '{search}'.</h2>
      ) : (
        <>
          <h2>
            {photos.length} {photos.length > 1 ? 'results' : 'result'} for '
            {search}':
          </h2>
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
        </>
      )}
    </div>
  );
};

export default Search;
