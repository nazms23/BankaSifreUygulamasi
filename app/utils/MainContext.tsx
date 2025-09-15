import React, { createContext, ReactNode, useEffect, useState } from "react";
import { FontSizes, LoginMethods, Theme } from "./types";
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MainContextType {
    isAllLoaded: boolean
    login: LoginType
    settings: SettingsType
    setFunctions: SetFunctionsType
}

interface LoginType {
    isLogined: boolean
    password: string,
    loginMethod: LoginMethods
};
interface SettingsType{
    fontSize: FontSizes,
    theme: Theme
}
interface SetFunctionsType{
    setIsLogined: (isLogined: boolean) => Promise<void>,
    setPassword: (password: string) => Promise<void>,
    setLoginMethod: (loginMethod: LoginMethods) => Promise<void>,
    setFontSize: (fontSize: FontSizes) => Promise<void>,
    setTheme: (theme: Theme) => Promise<void>,
    resetAllSettings: () => Promise<void>
}

const MainContextDefault: MainContextType = {
    isAllLoaded: false,
    login: {
        isLogined: false,
        password: "",
        loginMethod: LoginMethods.none
    },
    settings: {
        fontSize: FontSizes.default,
        theme: Theme.light
    },
    setFunctions: {
        setIsLogined: async () => {},
        setPassword: async () => {},
        setLoginMethod: async () => {},
        setFontSize: async () => {},
        setTheme: async () => {},
        resetAllSettings: async () => {}
    }
}

export const MainContext = createContext<MainContextType>(MainContextDefault)

export const MainContextProvider = ({children}: {children: ReactNode}) => {
    const [mainContextState, setMainContextState] = useState<MainContextType>(MainContextDefault)

    async function getPassword(): Promise<string> {
        return await SecureStore.getItemAsync('password') ?? ""
    }
    async function setPassword(password: string) {
        await SecureStore.setItemAsync('password', password);
        setMainContextState(prev => ({
            ...prev,
            login: { ...prev.login, password },
        }));
    }

    async function getLoginMethod(): Promise<LoginMethods> {
        const value = await SecureStore.getItemAsync('loginMethod') ?? LoginMethods.none
        return (value as LoginMethods) 
    }
    async function setLoginMethod(loginMethod: LoginMethods) {
        await SecureStore.setItemAsync('loginMethod', loginMethod.toString());
        setMainContextState(prev => ({
            ...prev,
            login: { ...prev.login, loginMethod },
        }));
    }

    async function getFontSize(): Promise<FontSizes> {
        const value = await AsyncStorage.getItem('fontSize')
        return (value as FontSizes) ?? FontSizes.default
    }
    async function setFontSize(fontSize: FontSizes) {
        await AsyncStorage.setItem('fontSize', fontSize);
        setMainContextState(prev => ({
            ...prev,
            settings: { ...prev.settings, fontSize },
        }));
    }

    async function getTheme(): Promise<Theme> {
        const value = await AsyncStorage.getItem('theme')
        return  (value as Theme) ?? Theme.light
    }
    async function setTheme(theme: Theme) {
        await AsyncStorage.setItem('theme', theme);
        setMainContextState(prev => ({
            ...prev,
            settings: { ...prev.settings, theme },
        }));
    }

    async function setIsLogined(isLogined: boolean) {
        setMainContextState(prev => ({
            ...prev,
            login: {
            ...prev.login,
            isLogined,
            },
        }));
    }

    async function resetAllSettings() {
        await Promise.all([SecureStore.deleteItemAsync('password'),SecureStore.deleteItemAsync('loginMethod'),AsyncStorage.clear()]).then(() => {
            getAllSetting()
        })
    }

    async function getAllSetting() {
        const [sPassword, loginMethod, sFontSize, sTheme]: [string,LoginMethods,FontSizes,Theme] = await Promise.all([getPassword(),getLoginMethod(),getFontSize(),getTheme()])

        const MainContextData: MainContextType = {
            isAllLoaded: true,
            login: {
                isLogined: loginMethod == LoginMethods.none,
                password: sPassword,
                loginMethod: loginMethod
            },
            settings: {
                fontSize: sFontSize,
                theme: sTheme
            },
            setFunctions: {
                setPassword,
                setFontSize,
                setTheme,
                setIsLogined,
                setLoginMethod,
                resetAllSettings
            }
        }

        setMainContextState(MainContextData)
    } 

    useEffect(() => {
        getAllSetting()
    }, [])

    return (
        <MainContext.Provider value={mainContextState}>
            {children}
        </MainContext.Provider>
    )
}