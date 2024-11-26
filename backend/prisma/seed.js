const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();


// A `main` function so that we can use async/await
async function main() {
    // Create users
    const adminUser = await prisma.user.create({
        data: {
            username: 'Admin User',
            password: 'securepassword1',
            email: `admin${Date.now()}@example.com`,
            userType: 'admin',
        },
    });

    const tailorUser = await prisma.user.create({
        data: {
            username: 'Tailor User',
            password: 'securepassword2',
            email: `tailor${Date.now()}@example.com`,
            userType: 'tailor',
        },
    });

    const normalUser = await prisma.user.create({
        data: {
            username: 'Normal User',
            password: 'securepassword3',
            email: `user${Date.now()}@example.com`,
            userType: 'user',
        },
    });

    console.log('Users created:', {adminUser, tailorUser, normalUser});

    // Create a portfolio for the tailor
    const portfolio = await prisma.portfolios.create({
        data: {
            tailorId: tailorUser.id,
            imgUrls: ["https://res.cloudinary.com/dotz9ajec/image/upload/v1730816545/vcaedpngltsy4dnwe0cj.jpg",
                "https://res.cloudinary.com/dotz9ajec/image/upload/v1730816545/rbj94ck1oqsl2u9kkca0.jpg",
                "https://res.cloudinary.com/dotz9ajec/image/upload/v1730816546/o3gd982gi3tys0jld8du.jpg"
            ],
            description: 'Tailor portfolio showcasing custom clothing designs.',
        },
    });

    console.log('Portfolio created:', portfolio);

    // Create an appointment for the normal user
    const appointment = await prisma.appointments.create({
        data: {
            appointmentDate: new Date('2024-12-01T10:00:00Z'),
            orderType: 'Custom Suit',
            tailoringItems: 3,
            comment: 'Need the suit ready for a wedding.',
            status: 'pending',
            customerId: normalUser.id,
        },
    });

    console.log('Appointment created:', appointment);

    // Create a review for the appointment
    const review = await prisma.reviews.create({
        data: {
            appointmentId: appointment.id,
            rating: 5,
            comment: 'The suit was perfect! Highly recommend.',
        },
    });

    console.log('Review created:', review);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });