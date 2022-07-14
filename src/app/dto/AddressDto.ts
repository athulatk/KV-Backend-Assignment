import { IsString } from "class-validator";

export class AddressDto{
    @IsString()
    public houseName:string

    @IsString()
    public streetName:string

    @IsString()
    public state:string

    @IsString()
    public country:string

    @IsString()
    public zipCode:string

    @IsString()
    public city:string

}