import axios from 'axios';
import { toast } from 'react-toastify';

export function loginUser(user) {
  return new Promise(async (resolve, reject) => {
    try {
    //   const res = await axios.post("/user/login", user)
    //   resolve({ data: res.data })
    } catch (error) {
    //   console.log(error);
    //   console.log("CANT LOGIN INVALID CREDENTIALS");
    //   toast("INVALID CREDENTIALS")
    //   reject({ data: null })
    }
  });
}