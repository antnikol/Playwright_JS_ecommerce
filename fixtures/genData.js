import { faker } from "@faker-js/faker";

export const newProductTestData = () => {
  return {
    quantity: faker.number.int({ min: 1, max: 10000 }),
    review: faker.lorem.sentences(3),
    randomCarouselProductNumber: faker.number.int({ min: 0, max: 2 }),
    commentToOrder: faker.lorem.sentences(3),
    randomLeftSidebarBrandNumber: faker.number.int({ min: 0, max: 2 }),
    anotherRandomLeftSidebarBrandNumber: faker.number.int({ min: 0, max: 2 }),
    subject: faker.commerce.productName(),
    message: faker.lorem.sentences(3),
  };
};