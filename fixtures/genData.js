import { fa, faker } from "@faker-js/faker";

export const newProductTestData = () => {
  return {
    productQuantity: faker.number.int({ min: 1, max: 10000 }),
    productReview: faker.lorem.sentences(3),
    carouselProductNumber: faker.number.int({ min: 0, max: 2 }),
    commentToOrder: faker.lorem.sentences(3),
    randomLeftSidebarBrandNumber: faker.number.int({ min: 0, max: 2 }),
    anotherRandomLeftSidebarBrandNumber: faker.number.int({ min: 0, max: 2 }),
    subject: faker.commerce.productName(),
    message: faker.lorem.sentences(3),

    userName: faker.string.alphanumeric(10),
    userEmail: faker.internet.email(),
    password: faker.internet.password(),
  };
};