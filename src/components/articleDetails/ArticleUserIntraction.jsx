import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addDislikeForArticle, addLikeForArticle, addNewsFavorite, delNewsFavorite, removeArticleLikeOrDislike } from '@core/index';
import {IntractionDesigne} from '../common/detail/InteractionDesine';

export function ArticleUserIntraction ({ pageId, data, onLikeChange }) {
  const queryClient = useQueryClient();
  const [likeState, setLikeState] = useState({ like: false, dislike: false });
  const [isBookmarked, setIsBookmarked] = useState(data.isCurrentUserFavorite);
  let likeId = data.likeId;

  useEffect(() => {
    setLikeState({
      like: data.currentUserIsLike,
      dislike: data.currentUserDissLike,
    });
  }, [data.currentUserLike, data.currentUserDissLike]);

  const { mutate: addFavNews } = useMutation({
    mutationFn: () => addNewsFavorite(pageId),
    onSuccess: (result) => {
      toast.success('به موارد دلخواه اضافه شد');
      queryClient.invalidateQueries(['newsDetails', result]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: delFavNews } = useMutation({
    mutationFn: (deleteEntityId) => delNewsFavorite(deleteEntityId),
    onSuccess: () => {
      toast.success(' از موارد دلخواه پاک شد');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: addArticleLike } = useMutation({
    mutationFn: (pageId) => addLikeForArticle(pageId),
    onSuccess: () => {
      queryClient.invalidateQueries(['newsDetails']);
    },
  });

  const { mutate: addArticleDislike } = useMutation({
    mutationFn: (pageId) => addDislikeForArticle(pageId),
    onSuccess: () => {
      queryClient.invalidateQueries(['newsDetails']);
    },
  });

  const { mutate: removeArticleLikeOrDislikeMutation } = useMutation({
    mutationFn: ({ likeId }) => removeArticleLikeOrDislike({ likeId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['newsDetails']);
    },
    onError: (error) => {
      console.log("Error removing like or dislike:", error);
    },
  });

  const handleBookmark = () => {
    if (isBookmarked) {
      delFavNews(data.currentUserFavoriteId);
    } else {
      addFavNews(pageId);
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = (type) => {
    if (type === 'like') {
      if (likeState.like) {
        removeArticleLikeOrDislikeMutation({ likeId });
      } else {
        addArticleLike(pageId);
        if (likeState.dislike) removeArticleLikeOrDislikeMutation({ likeId });
      }
      setLikeState({ like: !likeState.like, dislike: false });
    } else if (type === 'dislike') {
      if (likeState.dislike) {
        removeArticleLikeOrDislikeMutation({ likeId });
      } else {
        addArticleDislike(pageId);
        if (likeState.like) removeArticleLikeOrDislikeMutation({ likeId });
      }
      setLikeState({ like: false, dislike: !likeState.dislike });
    }

    if (onLikeChange) {
      onLikeChange(likeState);
    }
  };

  return (
    <IntractionDesigne
    isBookmarked={isBookmarked} 
    handleBookmark={handleBookmark} 
    likeState={likeState} 
    handleLike={handleLike} 
    likeCount={data.currentLikeCount} 
    dislikeCount={data.currentDissLikeCount} 
    />
  );
};

