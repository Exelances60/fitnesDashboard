export class Product {
  constructor(
    public readonly name: string,
    public readonly category: string,
    public readonly price: number,
    public readonly description: string,
    public readonly imageUrl: string,
    public readonly amount: number,
    public readonly ownerId: string,
    public readonly _id?: string
  ) {}
}
