export interface Session {
    accessToken: string;
}

const sessionStore: Session = {
    accessToken: "",
};

export const getAccessToken = (): string => sessionStore.accessToken;
export const setAccessToken = (token: string): void => {
    console.log(`set access token ${token}`);
    sessionStore.accessToken = token;
};
