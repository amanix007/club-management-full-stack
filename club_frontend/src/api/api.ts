import axios from "axios";
import { Member } from "../helpers/Types";
import { APP_baseAPI_URL } from "../_menifest";

axios.defaults.baseURL =  APP_baseAPI_URL;


export async function GET_MEMEBER_LIST() {
  try {
    let result = await axios.get("/v1/members/get-members");
    // console.log(result);
    if (!result.data.error) {
      return result.data;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
export async function CREATE_MEMEBR(OBJ: FormData) {
  let config = {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data;`,
      // "Content-Type": `multipart/form-data; boundary=${OBJ.avatar._boundary}`,
    },
  };

  try {
    let result = await axios.post("/v1/members/create-member", OBJ, config);
    // console.log(result);
    if (!result.data.error) {
      return result.data;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
export async function UPDATE_MEMEBR(OBJ: FormData) {
  let config = {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data;`,
      // "Content-Type": `multipart/form-data; boundary=${OBJ.avatar._boundary}`,
    },
  };

  try {
    let result = await axios.put("/v1/members/update-member", OBJ, config);
    // console.log(result);
    if (!result.data.error) {
      return result.data;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}