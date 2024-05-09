import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('decimal', { name: 'price', default: 0 })
  price: number;

  @Column('tinyint', { name: 'available', default: true })
  available: boolean;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  deletedAt: Date | null;
}
