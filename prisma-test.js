const { prisma } = require('./config/db');

async function main () {
    const role = prisma.role.createMany({
        data: {
            title: 'admin',
            description: 'default admin priveleges',
        }
    });
};

main();