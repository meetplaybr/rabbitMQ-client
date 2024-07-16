interface UserApp {
  id: number,
  fullname: string,
  saldo?: number,
  bonus?: number,
  username: string,
  userImg: string
}
export const users: UserApp[] = [
  {
    id: 1,
    fullname: 'Kemoel Amorim Miranda',
    username: 'kemoel.am',
    userImg: 'bernardodominic.png'
  },
  {
    id: 2,
    fullname: 'Thamiris Ruany',
    username: 'thamiris.ruany',
    userImg: 'elwinsharvill.png'
  },
]