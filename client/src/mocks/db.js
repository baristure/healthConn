import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

const db = factory({
  users: {
    id: primaryKey(faker.datatype.uuid),
    username: () => "user1",
    password: () => "12345678",
    type: () => "patient",
    image: () => faker.image.imageUrl(640, 480, "cat", true),
  },
});

db.users.create();

export default db;
