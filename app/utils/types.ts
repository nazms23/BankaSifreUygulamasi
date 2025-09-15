export type RootStackParamList = {
  App: undefined;
  Settings :undefined;
};

export enum FontSizes {
  small = "12px",
  default = "16px",
  large = "20px"
}

export enum Theme{
  dark = "dark",
  light = "light"
}

export enum NotificationType{
  Success = "Başarılı",
  Error = "Uyarı",
  Info = "Bilgi"
}

export enum LoginMethods{
  password = "password",
  biometric = "biometric",
  none = "none"
}