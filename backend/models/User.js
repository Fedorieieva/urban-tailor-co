const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

exports.createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        }
    });
};

exports.getUserById = async (id) => {
    return prisma.user.findUnique({
        where: {
            id: String(id),
        }
    });
};

exports.getUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email: String(email),
        }
    });
};

exports.updateUser = async (id, data) => {
    const {email} = data;
    if (email) {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser && existingUser.id !== id) {
            throw new Error('Email is already in use');
        }
    }

    return prisma.user.update({
        where: {
            id: String(id),
        },
        data,
    });
};

exports.deleteUser = async (id) => {
    return prisma.user.delete({
        where: {
            id: String(id),
        }
    });
};

exports.getAllUsers = async () => {
    return prisma.user.findMany();
}

exports.updateUserPassword = async (id, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    return prisma.user.update({
        where: {
            id: String(id),
        },
        data: {
            password: hashedPassword,
        },
    });
};

exports.comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
}