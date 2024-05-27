import { faker } from "@faker-js/faker"

function createObjects(){
    const container = []
    for (let index = 0; index < 10; index++) {
       container.push({
        id: Math.floor(Math.random() * 1000) + 1,
        user: {
            id: Math.floor(Math.random() * 1000) + 1,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            alumni_information: {
                id: Math.floor(Math.random() * 1000) + 1,
                student_number: faker.string.alphanumeric(8),
                first_name: faker.name.firstName(),
                middle_name: faker.name.middleName(),
                last_name: faker.name.lastName(),
                nationality: faker.address.country(),
                gender: faker.helpers.arrayElement(['Male', 'Female']),
                marital_status: faker.helpers.arrayElement(['Single', 'Married', 'Divorced', 'Widowed']),
                phone_number: faker.phone.number(),
                email: faker.internet.email(),
                birthday: faker.date.past().toISOString(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString()
            },
            about: faker.lorem.sentences()
        },
        text: faker.lorem.paragraph(),
        comment: {
            id: Math.floor(Math.random() * 1000) + 1,
            post_id: Math.floor(Math.random() * 1000) + 1,
            user_id: Math.floor(Math.random() * 1000) + 1,
            text: faker.lorem.sentence(),
            replies: [],
            reaction: [],
            reacted: null,
            replies_count: 0,
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString()
        },
        comments: [],
        privacy: faker.helpers.arrayElement(['public', 'private', 'connected']),
        reacted: null,
        views: Math.floor(Math.random() * 1000),
        view: true,
        reaction: [],
        reactions_count: 0,
        comments_count: Math.floor(Math.random() * 100),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString()
    }
    ) 
    }

    return container
}






export default [
   ...createObjects() 
]