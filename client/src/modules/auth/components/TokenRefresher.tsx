import { useEffect } from "react";

import { setAccessToken } from "@/store";

export interface TokenRefresherProps {
  onLoaded: () => void;
}

export const TokenRefresher: React.FC<TokenRefresherProps> = ({ onLoaded }) => {
  useEffect(() => {
    fetch("http://localhost:4444/refresh_token", {
      credentials: "include",
      method: "POST",
    })
      .then(async (response) => {
        const json = await response.json();
        if (json.ok) {
          setAccessToken(json.accessToken);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        onLoaded();
      });
  }, [onLoaded]);

  return null;
}