export interface Cart{
  cartId: number,
  userId: number,
  createdDate: string
}

export interface CartProduct{
  cartProductId: number,
  cartId: number,
  productId: number
}

export interface ShowCart{
  cartProductId: number,
  productId: number,
  name: string,
  productImage: string,
  description: string,
  price: number
}

export interface CartAggregate{
  totalPrice: number,
  totalItems: number
}

export interface CartResponse{
  statusCode: number,
  statusMessage: string,
  cartId: number

}
