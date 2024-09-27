export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface User {
  id: number
  username: string
  email: string
  name: string
  phone: string
  website: string
  address?: {
    city: string
    geo?: {
      lat: string
      lng: string
    }
    street: string
    suite: string
    zipcode: string
  }
  company?: {
    bs: string
    catchPhrase: string
    name: string
  }
}
