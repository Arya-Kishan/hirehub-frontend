import axios from 'axios';
import { toast } from 'react-toastify';

export function addApplication(formData) {
  return new Promise(async (resolve, reject) => {
    try {

      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      const res = await axios.post(`http://localhost:8080/application`, formData, { headers: config })
      resolve({ data: res.data })

    } catch (error) {

      console.log(error);
      console.log("CAN,T ADD YOUR APPLICATION");
      toast("APPLICATION NOT ADDED")
      reject({ data: null })

    }

  });

}