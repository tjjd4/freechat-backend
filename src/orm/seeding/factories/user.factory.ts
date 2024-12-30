import { setSeederFactory } from "typeorm-extension";
import User from "../../entity/user.entity";

 

export const UserFactory = setSeederFactory(User, (faker) => {
    const user = new User();

    user.name = faker.person.firstName();
    user.username = faker.internet.userName();
    user.password = faker.internet.password();
    
    return user;
})