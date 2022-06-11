import { auth } from "../firebase/firebaseAdmin";

export function withAuth(handler)
{
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Not authenticated. No Auth header" });
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
      if (
        !decodedToken ||
        !decodedToken.user_id
        // decodedToken.user_id !== req.query.uid
      ) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      // req.uid = decodedToken.user_id;
    } catch (error) {
      console.log(error);
      const errorCode = error.errorInfo.code;
      error.status = 401;
      if (errorCode === "auth/internal-error") {
        error.status = 500;
      }
      // TODO: handle firebase admin errors in more detail
      return res.status(error.status).json({ error: errorCode });
    }

    return handler(req, res);
  };
}