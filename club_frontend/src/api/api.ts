import axios from "axios";
import { Member } from "../helpers/Types";
import { REACT_APP_API_BASE_URL } from "../_menifest";

axios.defaults.baseURL = REACT_APP_API_BASE_URL;
console.log('REACT_APP_API_BASE_URL:', REACT_APP_API_BASE_URL)


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


export async function GET_MEMEBER_DETAILS(id: number) {
  try {
    let result = await axios.get("/v1/members/get-member-details/" + id);
    // console.log(result);
    if (!result.data.error) {
      return result.data.reesponse;
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




export async function DELETE_MEMEBER(id: number) {
  try {
    let result = await axios.delete("/v1/members/delete-member/" + id);
    // console.log(result);
    if (!result.data.error) {
      return result.data;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}