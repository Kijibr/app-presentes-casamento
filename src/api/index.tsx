import axios from 'axios';
const url = import.meta.env.VITE_API_URL || process.env.VITE_API_URL || "not found";
const api = axios.create({
  baseURL: url
})

export const createPayment = async (gift: string, valuePaid: number) => {
  try {
    const request = await api.post('/pix-payment', {
      "transaction_amount": valuePaid,
      "description": gift,
      "email": "kijicursos@gmail.com",
      "identificationType": "123321",
      "number": "21941233214"
    });
    if (request.status === 200)
      return request.data.point_of_interaction.transaction_data;
  } catch (err) {
    throw new Error('error in request: ' + err);
  }
}