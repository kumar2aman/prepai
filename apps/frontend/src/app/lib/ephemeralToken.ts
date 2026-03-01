import "dotenv/config";
import axios from "axios";

export async function getEphemeralToken(): Promise<string | null> {
  try {
    const res = await axios.get(`${process.env.backend_URL}/api/v1/token`,{
      withCredentials: true,
    });
    console.log("Ephemeral token:", res.data);
    return res.data.token;
  } catch (error) {
    console.error("Error fetching ephemeral token:", error);
    return null;
  }
}