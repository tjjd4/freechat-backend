import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import User from './user.entity';

@Entity('friends')  // In mySQL, table name could only be lower case
@Check(`"user_id" <> "friend_id"`)
export default class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false, name: 'user_id' })
  userId: number;

  @Column({ type: 'int', nullable: false, name: 'friend_id' })
  friendId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'friend_id' })
  friend: User;
}