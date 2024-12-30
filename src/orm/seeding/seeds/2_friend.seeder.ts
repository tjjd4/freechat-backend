import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import User from '../../entity/user.entity';
import Friend from '../../entity/friend.entity';

const TARGET_NAME = "sss"

export default class FriendSeeder implements Seeder {
    /**
     * Track seeder execution.
     *
     * Default: false
     */
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const userRepo = dataSource.getRepository(User);
        const friendRepo = dataSource.getRepository(Friend);

        const users = await userRepo.find();
        if (users.length < 2) {
            throw new Error('Not enough users to create friend pairs.');
        }
        const targetUser = await userRepo.findOne({ where: { username: TARGET_NAME } });
        if (!targetUser) {
            throw new Error(`User with username ${TARGET_NAME} not found.`);
        }
        const otherUsers = users.filter(user => user.id !== targetUser.id);

        const friend1 = friendRepo.create({
            userId: targetUser.id,
            friendId: otherUsers[0].id,
        });

        const friend_1 = friendRepo.create({
            userId: otherUsers[0].id,
            friendId: targetUser.id,
        });

        await friendRepo.save(friend1);
        await friendRepo.save(friend_1);

        const friend2 = friendRepo.create({
            userId: targetUser.id,
            friendId: otherUsers[1].id,
        });

        const friend_2 = friendRepo.create({
            userId: otherUsers[1].id,
            friendId: targetUser.id,
        });

        await friendRepo.save(friend2);
        await friendRepo.save(friend_2);
        
    }
}