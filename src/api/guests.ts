import { api } from ".";

export const getUserGuestAsync = async (userId: string) => {
  try {
    const request = await api.get(`/guests/${userId}`)
    if (request.status === 200)
      return request.data;
  } catch (err) {
    throw new Error('error in request to get current guest: ' + err);
  }
}

export const confirmInviteAsync = async (userId: string, guestAnswer: boolean, guestPassword: string) => {
  try {
    const request = await api.patch(`/guests/${userId}`, {
      confirmed: guestAnswer,
      password: guestPassword
    });

    if (request.status === 204) {
      return true;
    }
    return false;
  } catch (err) {
    console.error('error in request to send confirmation answer: ' + err);
    return false;
  }
}