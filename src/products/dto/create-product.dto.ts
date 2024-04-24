import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El campo name no puede estar vacío' })
  @IsString({
    message: 'El formato del campo name es incorrecto. Por favor ingrese una cadena de caracteres valida.',
  })
  @MaxLength(50, {
    message: 'El campo name puede tener como maximo 50 caracteres',
  })
  name: string;

  @IsPositive({ message: 'El campo price debe ser positivo' })
  @IsNotEmpty({ message: 'El campo price no puede estar vacío' })
  @Type(() => Number)
  price: number;
}
