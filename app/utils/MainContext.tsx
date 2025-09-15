import React, { createContext, ReactNode, useEffect, useState } from "react";
import { FontSizes, Theme } from "./types";
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
    password: string
};
interface SettingsType{
    fontSize: FontSizes,
    theme: Theme,
    useBiometricAuth: boolean
}
interface SetFunctionsType{
    setIsLogined: (isLogined: boolean) => Promise<void>,
    setPassword: (password: string) => Promise<void>,
    setFontSize: (fontSize: FontSizes) => Promise<void>,
    setTheme: (theme: Theme) => Promise<void>,
    setUseBiometricAuth: (useBiometricAuth: boolean) => Promise<void>,
}

const MainContextDefault: MainContextType = {
    isAllLoaded: false,
    login: {
        isLogined: false,
        password: ""
    },
    settings: {
        fontSize: FontSizes.default,
        theme: Theme.light,
        useBiometricAuth: false
    },
    setFunctions: {
        setIsLogined: async () => {},
        setPassword: async () => {},
        setFontSize: async () => {},
        setTheme: async () => {},
        setUseBiometricAuth: async () => {},
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
    
    async function getUseBiometric(): Promise<boolean> {
        return await AsyncStorage.getItem('useBiometric') === "true"
    }
    async function setUseBiometricAuth(useBiometric: boolean) {
        await AsyncStorage.setItem('useBiometric', useBiometric ? "true" : "false");
        setMainContextState(prev => ({
            ...prev,
            settings: { ...prev.settings, useBiometricAuth: useBiometric },
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

    async function getAllSetting() {
        const [sPassword, sFontSize, sTheme, sUseBiometric]: [string,FontSizes,Theme,boolean] = await Promise.all([getPassword(),getFontSize(),getTheme(),getUseBiometric()])

        const MainContextData: MainContextType = {
            isAllLoaded: true,
            login: {
                isLogined: sPassword == "",
                password: sPassword
            },
            settings: {
                fontSize: sFontSize,
                theme: sTheme,
                useBiometricAuth: sUseBiometric
            },
            setFunctions: {
                setPassword,
                setFontSize,
                setTheme,
                setIsLogined,
                setUseBiometricAuth
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