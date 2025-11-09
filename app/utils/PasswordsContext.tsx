import React, { createContext, ReactNode, useEffect, useMemo, useState, useCallback } from "react";
import { FontSizes, LoginMethods, Theme } from "./types";
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BankaImage, BankaSifre, KartSifreler } from "./models";
import CryptoJS from "crypto-js";
import * as Crypto from "expo-crypto";
import { Buffer } from "buffer";

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
  const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
  return CryptoJS.AES.encrypt(password, CryptoJS.enc.Hex.parse(SECRET_KEY), { iv }).toString();
}

export function decryptPassword(encrypted: string, SECRET_KEY: string): string {
  const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
  const bytes = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Hex.parse(SECRET_KEY), { iv });
  return bytes.toString(CryptoJS.enc.Utf8);
}

interface SetFunctionsType{
    setBankaSifreEkle: (yeniSifre: BankaSifre) => Promise<void>,
    setBankaSifreDegistir: (bankaSifre: BankaSifre) => Promise<void>,
    setBankaSifreSil: (id: number) => void,

    setKartSifreEkle: (kartSifre: KartSifreler) => Promise<void>,
    setKartSifreDegistir: (kartSifre: KartSifreler) => Promise<void>,
    setKartSifreSil: (id: number) => void,

    decryptPassword: (encrypted: string, SECRET_KEY: string) => string

    resetAllSettings: () => Promise<void>
}

const PasswordsContextDefault: PasswordsContextType = {
    bankaSifreler: [],
    kartSifreler: [],
    bankalar: Bankalar,

    secretKey: "",

    setFunctions: {
        setBankaSifreEkle: () => Promise.resolve(),
        setBankaSifreDegistir: () => Promise.resolve(),
        setBankaSifreSil: () => {},

        setKartSifreEkle: () => Promise.resolve(),
        setKartSifreDegistir: () => Promise.resolve(),
        setKartSifreSil: () => {},

        decryptPassword: decryptPassword,

        resetAllSettings: () => Promise.resolve()
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
            const randomBytes = await Crypto.getRandomBytesAsync(32);
            const newSecretKey = Buffer.from(randomBytes).toString('hex');
            await SecureStore.setItemAsync('secretKey', newSecretKey);
            setPasswordsContextState(prev => ({...prev, secretKey: newSecretKey}));
            return newSecretKey
        }
    }

    async function getBankaSifreler(): Promise<string> {
        const sifreler = await SecureStore.getItemAsync('bankaSifreler') ?? ""
        return sifreler
    }
    async function setBankaSifreEkle(yeniSifre: BankaSifre){
        const secretKey = await getOrSetSecretKey()
        const crypetPassword = encryptPassword(yeniSifre.sifre, secretKey)
        yeniSifre.sifre = crypetPassword;
        
        setPasswordsContextState(prev =>{ 
            yeniSifre.id = prev.bankaSifreler.length > 0 ? prev.bankaSifreler[prev.bankaSifreler.length-1].id + 1 : 1
            
            const bankaSifreler:BankaSifre[] = [...prev.bankaSifreler, yeniSifre]
            SecureStore.setItemAsync('bankaSifreler', JSON.stringify(bankaSifreler));
            return{...prev, bankaSifreler: bankaSifreler} 
        });
    }

    async function setBankaSifreDegistir(duzenlenmisSifre: BankaSifre){
        const secretKey = await getOrSetSecretKey()
        duzenlenmisSifre.sifre = encryptPassword(duzenlenmisSifre.sifre, secretKey)

        setPasswordsContextState((prev) => {
            const eskiSifreIndex = prev.bankaSifreler.findIndex(item => item.id === duzenlenmisSifre.id)
            if(eskiSifreIndex == -1){
                return {...prev}
            }
            let sifreData: BankaSifre[] = [...prev.bankaSifreler]
            sifreData[eskiSifreIndex] = duzenlenmisSifre

            SecureStore.setItemAsync('bankaSifreler', JSON.stringify(sifreData));
            return {...prev, bankaSifreler: sifreData}
        })
    }

    function setBankaSifreSil(id: number){
        setPasswordsContextState(prev => {
            const findIndex = prev.bankaSifreler.findIndex(item => item.id === id)
            if(findIndex == -1){
                return prev
            }
            let sifreData = [...prev.bankaSifreler]
            sifreData.splice(findIndex, 1)
            SecureStore.setItemAsync('bankaSifreler', JSON.stringify(sifreData));
            return {...prev, bankaSifreler: sifreData}
        })
    }

    async function getKartSifreler(): Promise<string> {
        return await SecureStore.getItemAsync('kartSifreler') ?? ""
    }

    async function setKartSifreEkle(kartSifre: KartSifreler){
        const secretKey = await getOrSetSecretKey()
        kartSifre.sifre = encryptPassword(kartSifre.sifre, secretKey)

        setPasswordsContextState(prev => {
            kartSifre.id = prev.kartSifreler.length > 0 ? prev.kartSifreler[prev.kartSifreler.length-1].id + 1 : 1
            
            const sifreData = [...prev.kartSifreler, kartSifre]
            SecureStore.setItemAsync('kartSifreler', JSON.stringify(sifreData));
            return {...prev, kartSifreler: sifreData}
        })
    }

    async function setKartSifreDegistir(kartSifre: KartSifreler){
        const secretKey = await getOrSetSecretKey()
        kartSifre.sifre = encryptPassword(kartSifre.sifre, secretKey)

        setPasswordsContextState(prev => {
            const findIndex = prev.kartSifreler.findIndex(item => item.id === kartSifre.id)
            if(findIndex == -1){
                return {...prev}
            }

            let sifreData = [...prev.kartSifreler]
            sifreData[findIndex] = kartSifre
            SecureStore.setItemAsync('kartSifreler', JSON.stringify(sifreData));
            return {...prev, kartSifreler: sifreData}
        })
    }

    function setKartSifreSil(id: number){
        setPasswordsContextState(prev => {
            const findIndex = prev.kartSifreler.findIndex(item => item.id === id)
            if(findIndex < 0){
                return prev
            }
            let sifreData = [...prev.kartSifreler]
            sifreData.splice(findIndex, 1)
            SecureStore.setItemAsync('kartSifreler', JSON.stringify(sifreData));
            return {...prev, kartSifreler: sifreData}
        })
    }

    async function resetAllSettings() {
        await Promise.all([SecureStore.deleteItemAsync('kartSifreler'),SecureStore.deleteItemAsync('bankaSifreler'),SecureStore.deleteItemAsync('secretKey')]).then(() => {
            getAllSetting()
        })
    }

    async function getAllSetting() {
        try
        {
            const [secretKeyData, bankaSifrelerJSON, kartSifrelerJSON]: [string,string, string] = 
            await Promise.all([getOrSetSecretKey(),getBankaSifreler(), getKartSifreler()]);
        
            const bankaSifrelerData: BankaSifre[] = bankaSifrelerJSON == "" ? [] : JSON.parse(bankaSifrelerJSON)
            const kartSifrelerData: KartSifreler[] = kartSifrelerJSON == "" ? [] : JSON.parse(kartSifrelerJSON)

            setPasswordsContextState(prev => ({
                ...prev,
                bankaSifreler: bankaSifrelerData,
                kartSifreler: kartSifrelerData,
                secretKey: secretKeyData
            }))
        }
        catch(e){
            console.log(e)
        }
    } 

    const setFunctions = useMemo<SetFunctionsType>(() => ({
        setBankaSifreEkle: setBankaSifreEkle,
        setBankaSifreDegistir: setBankaSifreDegistir,
        setBankaSifreSil: setBankaSifreSil,
        setKartSifreEkle: setKartSifreEkle,
        setKartSifreDegistir: setKartSifreDegistir,
        setKartSifreSil: setKartSifreSil,
        decryptPassword: decryptPassword,
        resetAllSettings: resetAllSettings
    }), [passwordsContextState.bankaSifreler, passwordsContextState.kartSifreler])

    const contextValue = useMemo<PasswordsContextType>(() => ({
        ...passwordsContextState,
        setFunctions: setFunctions
    }), [passwordsContextState, setFunctions])

    useEffect(() => {
        getAllSetting()
    }, [])

    return (
        <PasswordsContext.Provider value={contextValue}>
            {children}
        </PasswordsContext.Provider>
    )
}