export class CreateProductDto{
    private readonly id?: number;
    private readonly name: string;
    private readonly price: number;
    private readonly description: string;
    private readonly category: string;
    private readonly available: boolean;
    private readonly image: string;
}