import { createContext, useContext, useEffect, useState } from "react";

interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;
}

type TProps = {
    children: React.ReactNode
}

const CurrentAppContext = createContext<IAppContext | null>(null);

export const AppProvider = (props: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsAuthenticated(true);
        }
        setIsAppLoading(false);
    }, []);

    return (
        <CurrentAppContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAppLoading, setIsAppLoading }}>
            {props.children}
        </CurrentAppContext.Provider>
    );
};

//custom hook
export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentAppContext.Provider>"
        );
    }

    return currentAppContext;
};