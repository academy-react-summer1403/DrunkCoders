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