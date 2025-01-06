import { fa, faker } from "@faker-js/faker";

export const userTestData = () => {
  return {
    name: faker.animal.petName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    title: ['Mr', 'Mrs'][faker.number.int({ min: 0, max: 1 })],
    birth_date: faker.number.int({ min: 1, max: 31 }),
    birth_month: faker.date.month(),
    birth_year: faker.number.int({ min: 1900, max: 2021 }),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country:['Canada', 'United States', 'Israel', 'India', 'Australia', 'New Zealand', 'Singapore'][faker.number.int({ min: 0, max: 6 })],
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number({ style: 'international' })
  };
};