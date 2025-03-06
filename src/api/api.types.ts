export type TUserDireccion =  {id: string, calle: string, numero: string, comuna?: string, defaultAddress: boolean}

export type TUserData = {
  id: string
  fullName: string
  birth: string | null
  email: string | null
  direcciones?: TUserDireccion[]
}