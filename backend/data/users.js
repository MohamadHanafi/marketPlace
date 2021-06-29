import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Mohamad Hanafi',
        email: 'hanof@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Ahmad Tobasi',
        email: 'tobasi@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Lutf Alsubari',
        email: 'lutf@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Mohamad Assaf',
        email: 'assaf@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Mohamad Sawalha',
        email: 'sawalha@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
];

export default users;