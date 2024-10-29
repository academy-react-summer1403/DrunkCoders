import { api } from '../interceptor'

export async function getNewsById (id){
    try {
        const response = await api.get(`/news/${id}`)
        return response
    } catch (error) {
        console.log('Error fetching news details:', error);
        // throw new Error("Could not fetch news details")
    }
}

export async function addNewsFavorite (id) {
    try {
        const response = await api.post(`/News/AddFavoriteNews?NewsId=${id}`)
        return response
    } catch (error) {
        console.log('addNewsFavorite', error);
    }
}

export async function delNewsFavorite (deleteEntityId){
    try {
        const response = await api.delete('/News/DeleteFavoriteNews',{
            data: { deleteEntityId }
        })
        return response 
    } catch (error) {
        console.log('delete fav course', error);
    }
}

export async function rateNews ({newsId , newRating}) {
    try {
      const response = await api.post(`/News/NewsRate?NewsId=${newsId}&RateNumber=${newRating}`)
      return response;
    } catch (error) {
      console.log('Error sending comment', error.message);
    //   throw error;
    }
}

export async function getNewsComment(newsId) {
    try {
        const response = await api.get(`/News/GetNewsComments?NewsId=${newsId}`);
        return response;
    } catch (error) {
        console.log('Error get comment', error);
    }
}

export async function getNewsReply (commentId) {
    try {
        const response = await api.get(`/News/GetRepliesComments?Id=${commentId}`)
        return response;
    } catch (error) {
        console.log('error get replies', error);
        // throw error;
    }
}

export async function postArticleCommentLike(commentId){
    try {
        const response = await api.post(`/News/CommentLike/${commentId}?LikeType=true`)
        return response;
    } catch (error) {
        console.log('error like article comment like', error.message);
        // throw error
    }
}

export async function deleteArticleCommentLike (deleteEntityId) {
    try {
        const response = await api.delete(`/News/DeleteCommentLikeNews`,{
            data: {deleteEntityId}
        })
        return response;
    } catch (error) {
        console.log('error delete comment like', error);
        // throw error;
    }
}

export async function postNewsComment(commentData) {
    try {
        const response = await api.post(`/News/CreateNewsComment`, commentData);
        return response; 
    } catch (error) {
        console.log('Error posting comment:', error);
        // throw error;
    }
}

export async function postNewsReply(replyData) {
    try {
        const response = await api.post(`/News/CreateNewsComment`, replyData);
        return response; 
    } catch (error) {
        console.log('Error posting reply:', error);
        // throw error;
    }
}