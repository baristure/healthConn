import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

const db = factory({
  users: {
    id: primaryKey(faker.datatype.uuid),
    first_name: () => faker.random.word(),
    last_name: () => faker.random.word(),
    email: () => faker.internet.email(),
    password: () => "12345678",
    mobile_number: () => "user1",
    type: () => faker.helpers.arrayElement(["Patient", "Doctor"]),
    image_url: () => faker.image.imageUrl(640, 480, "cat", true),
  },
  patientDetails: {
    user_id: primaryKey(faker.datatype.uuid),
    blood_group: () =>
      faker.helpers.arrayElement([
        "0 Rh+",
        "0 Rh-",
        "A Rh+",
        "A Rh-",
        "B Rh+",
        "B Rh-",
        "AB Rh+",
        "AB Rh-",
      ]),
    weight: () => faker.random.numeric(2),
    height: () => faker.random.numeric(3),
    birth_date: () => faker.date.birthdate({ min: 0, max: 99, mode: "age" }),
    gender: () => faker.helpers.arrayElement(["Male", "Female"]),
    allergies: () => faker.lorem.slug(),
  },
  doctorDetails: {
    user_id: primaryKey(faker.datatype.uuid),
    office_number: () => faker.phone.number(),
    speciality: () => faker.random.word(),
    rating: () => faker.random.numeric(),
    title: () => faker.random.word(),
    resume: () => faker.lorem.sentences(5, "\n"),
  },
  appointments: {
    doctor_id: primaryKey(faker.datatype.uuid),
    patient_id: faker.datatype.uuid,
    recognization: () => "user1",
    start_date: () => faker.date.soon(2),
    end_date: () => faker.date.soon(2),
  },
  complaintSeverity: {
    appointment_id: primaryKey(faker.datatype.uuid),
    part: () => faker.random.word(),
    severity: () => faker.random.numeric(),
    comment: () => faker.random.words(7),
  },
  doctorMemberships: {
    doctor_id: primaryKey(faker.datatype.uuid),
    type: () => faker.helpers.arrayElement(["Membership", "Publication"]),
    name: () => faker.random.words(7),
  },
  doctorReviews: {
    doctor_id: primaryKey(faker.datatype.uuid),
    point: () => faker.random.numeric(),
    comment: () => faker.random.words(7),
  },
});

db.users.create();
db.users.create();
db.patientDetails.create();
db.patientDetails.create();
db.doctorDetails.create();
db.doctorDetails.create();
db.appointments.create();
db.appointments.create();
db.complaintSeverity.create();
db.complaintSeverity.create();
db.doctorMemberships.create();
db.doctorMemberships.create();
db.doctorReviews.create();
db.doctorReviews.create();

export default db;
