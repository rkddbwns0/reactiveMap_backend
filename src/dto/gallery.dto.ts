import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  place: string;

  @IsNotEmpty()
  @IsString()
  lon: string;

  @IsNotEmpty()
  @IsString()
  lat: string;
}
