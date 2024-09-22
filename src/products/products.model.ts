export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
    public category: string,
    public rating: string,
    public discountPercentage: number,
    public image: string[],
    public thumbnail: string,
  ) {}
}
