import React, { createContext, ReactNode, useEffect, useState } from "react";
import { FontSizes, LoginMethods, Theme } from "./types";
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BankaImage, BankaSifre, KartSifreler } from "./models";
import CryptoJS from "crypto-js";

interface PasswordsContextType {
    bankaSifreler: BankaSifre[],
    kartSifreler: KartSifreler[],
    bankalar: BankaImage[],

    secretKey: string,

    setFunctions: SetFunctionsType
}

const Bankalar: BankaImage[] = [
    {id: 1, bankaAdi: "Akbank", gorsel: require("../../assets/bankalar/Akbank.png")},
    {id: 2, bankaAdi: "Denizbank", gorsel: require("../../assets/bankalar/denizbank.png")},
    {id: 3, bankaAdi: "Finansbank", gorsel: require("../../assets/bankalar/finansbank.png")},
    {id: 4, bankaAdi: "Garanti BBVA", gorsel: require("../../assets/bankalar/garanti.png")},
    {id: 5, bankaAdi: "Halkbank", gorsel: require("../../assets/bankalar/Halkbank.png")},
    {id: 6, bankaAdi: "Ing Bank", gorsel: require("../../assets/bankalar/ingbank.png")},
    {id: 7, bankaAdi: "İş Bankası", gorsel: require("../../assets/bankalar/isbankasi.png")},
    {id: 8, bankaAdi: "Vakıfbank", gorsel: require("../../assets/bankalar/Vakif.png")},
    {id: 9, bankaAdi: "Yapı Kredi", gorsel: require("../../assets/bankalar/yapikredi.png")},
    {id: 10, bankaAdi: "Ziraat Bankası", gorsel: require("../../assets/bankalar/Ziraat.png")},
    {id: 11, bankaAdi: "Diğer"},

]

export function encryptPassword(password: string, SECRET_KEY: string): string {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
}

export function decryptPassword(encrypted: string, SECRET_KEY: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

interface SetFunctionsType{
    setBankaSifreEkle: (bankaSifre: BankaSifre) => Promise<void>,
    setBankaSifreDegistir: (id: number, bankaSifre: BankaSifre) => Promise<void>,
    setBankaSifreSil: (id: number) => Promise<void>,

    setKartSifreEkle: (kartSifre: KartSifreler) => Promise<void>,
    setKartSifreDegistir: (id: number, kartSifre: KartSifreler) => Promise<void>,
    setKartSifreSil: (id: number) => Promise<void>,
}

const PasswordsContextDefault: PasswordsContextType = {
    bankaSifreler: [],
    kartSifreler: [],
    bankalar: Bankalar,

    secretKey: "",

    setFunctions: {
        setBankaSifreEkle: () => Promise.resolve(),
        setBankaSifreDegistir: () => Promise.resolve(),
        setBankaSifreSil: () => Promise.resolve(),

        setKartSifreEkle: () => Promise.resolve(),
        setKartSifreDegistir: () => Promise.resolve(),
        setKartSifreSil: () => Promise.resolve(),
    }
}

export const PasswordsContext = createContext<PasswordsContextType>(PasswordsContextDefault)

export const PasswordsContextProvider = ({children}: {children: ReactNode}) => {
    const [passwordsContextState, setPasswordsContextState] = useState<PasswordsContextType>(PasswordsContextDefault)

    async function getOrSetSecretKey(): Promise<string> {
        if(passwordsContextState.secretKey != ""){
            return passwordsContextState.secretKey;
        }

        const secretKey = await SecureStore.getItemAsync('secretKey')
        if (secretKey) {
            setPasswordsContextState(prev => ({...prev, secretKey}));
            return secretKey
        } else {
            const newSecretKey = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
            await SecureStore.setItemAsync('secretKey', newSecretKey);
            setPasswordsContextState(prev => ({...prev, secretKey: newSecretKey}));
            return newSecretKey
        }
    }

    async function getBankaSifreler(): Promise<string> {
        return await SecureStore.getItemAsync('bankaSifreler') ?? ""
    }
    async function setBankaSifreEkle(bankaSifre: BankaSifre){
        const secretKey = await getOrSetSecretKey()

        bankaSifre.sifre = encryptPassword(bankaSifre.sifre, secretKey)

        let sifreData: BankaSifre[] = []
        setPasswordsContextState(prev => {
            sifreData = [...prev.bankaSifreler, bankaSifre]
            return {...prev, bankaSifreler: sifreData}
        });
        await SecureStore.setItemAsync('bankaSifreler', JSON.stringify(sifreData));
    }

    async function setBankaSifreDegistir(id: number, bankaSifre: BankaSifre){
        const secretKey = await getOrSetSecretKey()

        bankaSifre.sifre = encryptPassword(bankaSifre.sifre, secretKey)

        let sifreData: BankaSifre[] = []
        setPasswordsContextState(prev => {
            const findIndex = prev.bankaSifreler.findIndex(item => item.id === id)
            if(findIndex < 0){
                return prev
            }
            sifreData = [...prev.bankaSifreler]
            sifreData[findIndex] = bankaSifre
            return {...prev, bankaSifreler: sifreData}
        })
        if(sifreData.length === 0){
            return
        }
        await SecureStore.setItemAsync('bankaSifreler', JSON.stringify(sifreData));
    }

    async function setBankaSifreSil(id: number){
        let sifreData: BankaSifre[] = []
        setPasswordsContextState(prev => {
            const findIndex = prev.bankaSifreler.findIndex(item => item.id === id)
            if(findIndex < 0){
                return prev
            }
            sifreData = [...prev.bankaSifreler]
            sifreData.splice(findIndex, 1)
            return {...prev, bankaSifreler: sifreData}
        })
        if(sifreData.length === 0){
            return
        }
        await SecureStore.setItemAsync('bankaSifreler', JSON.stringify(sifreData));
    }

    async function getKartSifreler(): Promise<string> {
        return await SecureStore.getItemAsync('kartSifreler') ?? ""
    }

    async function setKartSifreEkle(kartSifre: KartSifreler){
        const secretKey = await getOrSetSecretKey()

        kartSifre.sifre = encryptPassword(kartSifre.sifre, secretKey)

        let sifreData: KartSifreler[] = []
        setPasswordsContextState(prev => {
            sifreData = [...prev.kartSifreler, kartSifre]
            return {...prev, kartSifreler: sifreData}
        })
        await SecureStore.setItemAsync('kartSifreler', JSON.stringify(sifreData));
    }

    async function setKartSifreDegistir(id: number, kartSifre: KartSifreler){
        const secretKey = await getOrSetSecretKey()

        kartSifre.sifre = encryptPassword(kartSifre.sifre, secretKey)

        let sifreData: KartSifreler[] = []
        setPasswordsContextState(prev => {
            const findIndex = prev.kartSifreler.findIndex(item => item.id === id)
            if(findIndex < 0){
                return prev
            }
            sifreData = [...prev.kartSifreler]
            sifreData[findIndex] = kartSifre
            return {...prev, kartSifreler: sifreData}
        })
        if(sifreData.length === 0){
            return
        }
        await SecureStore.setItemAsync('kartSifreler', JSON.stringify(sifreData));
    }

    async function setKartSifreSil(id: number){
        let sifreData: KartSifreler[] = []
        setPasswordsContextState(prev => {
            const findIndex = prev.kartSifreler.findIndex(item => item.id === id)
            if(findIndex < 0){
                return prev
            }
            sifreData = [...prev.kartSifreler]
            sifreData.splice(findIndex, 1)
            return {...prev, kartSifreler: sifreData}
        })
        if(sifreData.length === 0){
            return
        }
        await SecureStore.setItemAsync('kartSifreler', JSON.stringify(sifreData));
    }

    async function getAllSetting() {
        const [secretKeyData, bankaSifrelerJSON, kartSifrelerJSON]: [string,string, string] = 
        await Promise.all([getOrSetSecretKey(),getBankaSifreler(), getKartSifreler()]);

        const bankaSifrelerData: BankaSifre[] = JSON.parse(bankaSifrelerJSON)
        const kartSifrelerData: KartSifreler[] = JSON.parse(kartSifrelerJSON)

        const PasswordsContextData: PasswordsContextType = {
            bankaSifreler: bankaSifrelerData,
            kartSifreler: kartSifrelerData,
            bankalar: Bankalar,
            secretKey: secretKeyData,
            setFunctions: {
                setBankaSifreEkle: setBankaSifreEkle,
                setBankaSifreDegistir: setBankaSifreDegistir,
                setBankaSifreSil: setBankaSifreSil,
                setKartSifreEkle: setKartSifreEkle,
                setKartSifreDegistir: setKartSifreDegistir,
                setKartSifreSil: setKartSifreSil
            }
        }

        setPasswordsContextState(PasswordsContextData)
    } 

    useEffect(() => {
        getAllSetting()
    }, [])

    return (
        <PasswordsContext.Provider value={passwordsContextState}>
            {children}
        </PasswordsContext.Provider>
    )
}