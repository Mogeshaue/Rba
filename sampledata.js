const sequelize = require('./config/database');
const User = require('./models/user');
const Task = require('./models/task');
const bcrypt = require('bcrypt');

async function sampleData() {     
        await sequelize.sync({ force: true }); 
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            username: 'Admin',
            email: 'admin@hyperverge.co',
            password: adminPassword,
            role: 'admin'
        });

        const user1Password = await bcrypt.hash('user123', 10);
        const user1 = await User.create({
            username: 'user1',
            email: 'user1@gmail.com',
            password: user1Password,
            role: 'user'
        });

        const user2Password = await bcrypt.hash('user123', 10);
        const user2 = await User.create({
            username: 'user2',
            email: 'user2@gmail.com',
            password: user2Password,
            role: 'user'
        });

        const tasks = [
            { userId: admin.id, title: 'Review system architecture', description: 'Review and update the system architecture documentation' },
            { userId: admin.id, title: 'Approve user requests', description: 'Review and approve pending user access requests' },
            { userId: user1.id, title: 'Complete project proposal', description: 'Finish writing the Q1 project proposal document' },
            { userId: user1.id, title: 'Update documentation', description: 'Update API documentation with new endpoints' },
            { userId: user1.id, title: 'Code review', description: 'Review pull requests from team members' },
            { userId: user2.id, title: 'Design new feature', description: 'Create mockups for the new dashboard feature' },
            { userId: user2.id, title: 'Testing', description: 'Write unit tests for authentication module' },
            { userId: user2.id, title: 'Bug fixes', description: 'Fix reported bugs in the login flow' }
        ];

        for (const taskData of tasks) {
            await Task.create(taskData);
        }
        process.exit(0);
}

sampleData();
