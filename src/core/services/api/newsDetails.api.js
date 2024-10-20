import { api } from '../interceptor'

export async function getNewsById (id){
    try {
        const response = await api.get(`/news/${id}`)
        console.log(' Api Response', response);
        return response
    } catch (error) {
        console.log('Error fetching news details:', error);
        throw new Error("Could not fetch news details")
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
      throw error;
    }
}