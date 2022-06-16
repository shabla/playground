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
export const isLoggedIn = (): boolean => !!sessionStore.accessToken;
export const logout = (): void => {
    sessionStore.accessToken = "";
};
