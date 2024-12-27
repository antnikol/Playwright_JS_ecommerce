import { faker } from "@faker-js/faker";

module.exports = {
    newProductTestData: function () {
        let Product = {
            quantity: faker.number.int({ min: 1, max: 10000 }),
            review: faker.lorem.sentences(3),
            randomCarouselProductNumber: faker.number.int({ min: 0, max: 2 }),
            commentToOrder: faker.lorem.sentences(3),
            randomLeftSidebarBrandNumber: faker.number.int({ min: 0, max: 2 }),
            anotherRandomLeftSidebarBrandNumber: faker.number.int({ min: 0, max: 2 }),
            subject: faker.commerce.productName(),
            message: faker.lorem.sentences(3),
            // name: faker.company.buzzNoun(),
            // longName: faker.commerce.productName(),
            // newName: faker.company.buzzNoun(),
            // description: faker.lorem.sentences(3),
            // newDescription: faker.lorem.sentences(2),
            // folderName: faker.company.buzzNoun(),
            // longDescription: faker.lorem.sentences(50),
            // userName: faker.person.lastName(),
            // tokenName: faker.person.lastName()
        };
        return Product;
    },
};