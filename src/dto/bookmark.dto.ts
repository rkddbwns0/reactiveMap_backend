import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SelectAllBookmarkDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  place: string;
}

export class FindBookmarkDto {
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

export class CreateBookmarkDto {
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

export class DeleteBookmarkDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  place: string;
}
