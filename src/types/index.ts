type BaseType = {
  id: string,
  createdAt?: string,
  name: string,
}

export type GiftType = BaseType & {
  id: string,
  giftValue: string,
  image?: string
}

export type PaymentType = BaseType & {
  giftId: string,
  giftName: string,
  qrCode?: string,
  value: string,
}

export type GiftToPay = {
  id: string,
  name: string,
  giftValue: string,
  image?: string,
  qrCode: string,
}
