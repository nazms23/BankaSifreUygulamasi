import { ImageSourcePropType } from "react-native";

export interface BankaImage {
    id: number,
    bankaAdi: string,
    gorsel?: ImageSourcePropType
}

export interface BankaSifre {
    id: number,
    banka: BankaImage,
    sifre: string,
    degistirmeTarihi?: Date,
    degistirmePeriyodu?: number
}

export interface KartSifreler {
    id: number,
    kart: BankaImage,
    sifre: string,
    aciklama?: string,
    kartNumarasi?: string,
    kartCVC?: string
    kartSonKullanmaTarihi?: string
}