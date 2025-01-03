import axios from "axios";


export const unverifiedCode = async () => {

    try {
        const response = await axios.get("https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/admin/qrtoverify", { withCredentials: true });
        return response?.data?.qrtoverify.length || "0";
    } catch (error) {
        return "0";
    }

}