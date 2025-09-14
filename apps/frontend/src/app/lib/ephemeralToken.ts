
import axios from "axios";

export async function getEphemeralToken(): Promise<string | null> {
  try {
    const res = await axios.get("http://localhost:3001/api/token");
    console.log("Ephemeral token:", res.data);
    return res.data.token;
  } catch (error) {
    console.error("Error fetching ephemeral token:", error);
    return null;
  }
}