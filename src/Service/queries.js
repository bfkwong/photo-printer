import Auth from "@aws-amplify/auth";
import { userTypes } from "../constants";

export async function getUserType() {
  return userTypes.PRINTER;
}

export async function postNewOrder(payload) {
  try {
    const cogUserId = await Auth.currentSession();

    const response = await fetch(
      "https://qrt54y4ylj.execute-api.us-west-2.amazonaws.com/api/v1/ordermanagement/uploadorder",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: cogUserId?.idToken?.jwtToken
        },
        body: JSON.stringify({
          body: payload
        })
      }
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function getAllOrders() {
  try {
    const cogUserId = await Auth.currentSession();
    const cogUsername = cogUserId?.idToken?.payload["cognito:username"];

    const reqUrl = new Request(
      `https://qrt54y4ylj.execute-api.us-west-2.amazonaws.com/api/v1/ordermanagement/getallorder?userId=${cogUsername}`
    );
    const response = await fetch(reqUrl, {
      method: "GET",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return [];
  }
}
