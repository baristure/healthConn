import { faker } from "@faker-js/faker";
import { factory, primaryKey, nullable } from "@mswjs/data";
import { getNextXMonth, sequentialNumberPrimaryKey } from "./util";

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
    id: primaryKey(sequentialNumberPrimaryKey()),
    service: () => faker.random.word(2),
    doctor: () => "Prof. " + faker.random.words(2),
    patient: () => faker.random.words(2),
    date: () => faker.date.soon(2),
    rating: nullable(() => faker.helpers.arrayElement([1, 2, 3, 4, 5, null])),
    doctorNote: nullable(() => faker.random.word(25)),
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
db.appointments.create({ doctorNote: null, rating: null, date: getNextXMonth(1) });
db.appointments.create({ doctorNote: null, rating: null, date: getNextXMonth(-1) });
db.appointments.create();
db.appointments.create();
db.appointments.create();
db.appointments.create();
db.complaintSeverity.create();
db.complaintSeverity.create();
db.doctorMemberships.create();
db.doctorMemberships.create();
db.doctorReviews.create();
db.doctorReviews.create();

export default db;
