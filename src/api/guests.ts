import { api } from ".";

export const getUserGuestAsync = async (userId: string) => {
  try {
    const request = await api.get(`/guests/${userId}`)
    if (request.status === 200)
      return request.data;
  } catch (err) {
    throw new Error('error in request: ' + err);
  }
}