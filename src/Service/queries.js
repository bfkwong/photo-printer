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
      mode: "cors",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function getAllOrdersByStore(storeId) {
  try {
    const cogUserId = await Auth.currentSession();

    const reqUrl = new Request(
      `https://qrt54y4ylj.execute-api.us-west-2.amazonaws.com/api/v1/ordermanagement/getallorder?storeId=${storeId}`
    );
    const response = await fetch(reqUrl, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function getOrder(orderId) {
  try {
    const cogUserId = await Auth.currentSession();

    const reqUrl = new Request(
      `https://qrt54y4ylj.execute-api.us-west-2.amazonaws.com/api/v1/ordermanagement/getorder?orderId=${orderId}`
    );
    const response = await fetch(reqUrl, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function deleteOrder(orderId) {
  try {
    const cogUserId = await Auth.currentSession();

    const reqUrl = new Request(
      `https://qrt54y4ylj.execute-api.us-west-2.amazonaws.com/api/v1/ordermanagement/deleteorder?orderId=${orderId}`
    );
    const response = await fetch(reqUrl, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function getUserInfo() {
  try {
    const cogUserId = await Auth.currentSession();
    const cogUsername = cogUserId?.idToken?.payload["cognito:username"];

    const reqUrl = new Request(`https://y5fcpp24be.execute-api.us-west-2.amazonaws.com/${cogUsername}`);
    const response = await fetch(reqUrl, {
      method: "GET",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function postUserInfo(payload) {
  try {
    const cogUserId = await Auth.currentSession();
    const cogUsername = cogUserId?.idToken?.payload["cognito:username"];

    const reqUrl = new Request(`https://y5fcpp24be.execute-api.us-west-2.amazonaws.com/${cogUsername}`);
    const response = await fetch(reqUrl, {
      method: "PATCH",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      },
      body: JSON.stringify(payload)
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function updateUserType(userId, AccessLevel) {
  try {
    const cogUserId = await Auth.currentSession();

    const reqUrl = new Request(`https://y5fcpp24be.execute-api.us-west-2.amazonaws.com/${userId}`);
    const response = await fetch(reqUrl, {
      method: "PATCH",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      },
      body: JSON.stringify({ AccessLevel })
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function getAllUsers() {
  try {
    const cogUserId = await Auth.currentSession();

    const reqUrl = new Request(`https://y5fcpp24be.execute-api.us-west-2.amazonaws.com`);
    const response = await fetch(reqUrl, {
      method: "GET",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function assignOrder(orderId, employee) {
  try {
    const cogUserId = await Auth.currentSession();
    const reqUrl = new Request(
      `https://qrt54y4ylj.execute-api.us-west-2.amazonaws.com/api/v1/ordermanagement/assignorder`
    );
    const response = await fetch(reqUrl, {
      method: "POST",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      },
      body: JSON.stringify({
        body: {
          assignOrder: {
            orderId,
            employee
          }
        }
      })
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function sendEmailNotif(email) {
  try {
    const cogUserId = await Auth.currentSession();
    const reqUrl = new Request(`https://c7q2kkfj62.execute-api.us-west-2.amazonaws.com/dev/invite?email=${email}`);
    const response = await fetch(reqUrl, {
      method: "GET",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function updateOrderStatus(orderId, orderStatus) {
  try {
    const cogUserId = await Auth.currentSession();
    const reqUrl = new Request(
      `https://qrt54y4ylj.execute-api.us-west-2.amazonaws.com/api/v1/ordermanagement/editorder?orderId=${orderId}&status=${orderStatus}`
    );
    const response = await fetch(reqUrl, {
      method: "PATCH",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      }
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}

export async function createShippo(payload) {
  try {
    const cogUserId = await Auth.currentSession();
    const reqUrl = new Request(`https://c7q2kkfj62.execute-api.us-west-2.amazonaws.com/dev/tracking/create-shippo`);
    const response = await fetch(reqUrl, {
      method: "POST",
      headers: {
        Authorization: cogUserId?.idToken?.jwtToken
      },
      body: JSON.stringify(payload)
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    return "ERROR";
  }
}
