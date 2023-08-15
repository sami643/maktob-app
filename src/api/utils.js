import axios from "axios";
export async function getMaktobs(
  userId,
  userStatus = "owner",
  newMaktob = true
) {
  try {
    const response = await axios.post("/api/maktob/maktobs", {
      data: {
        userId,
        userStatus,
        newMaktob,
      },
    });

    return response.data.Maktobs_List_data;
  } catch (err) {
    throw new Error("couldn't get maktob list from server", err);
  }
}
