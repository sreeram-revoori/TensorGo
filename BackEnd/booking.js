const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const users = [
    { id: 1, email: 'user@example.com', name: 'John Doe' },
];

const usageData = {
    1: { usage: 100, lastBillingCycle: '2023-11-01' },
};


const invoices = {
    1: { id: 1, userId: 1, amount: 50, generatedAt: '2023-12-01' },
    
};


app.post('/auth/google', (req, res) => {
    const user = users[0]; 
    res.json(user);
});


app.get('/usage/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userUsage = usageData[userId];
    if (userUsage) {
        res.json(userUsage);
    } else {
        res.status(404).json({ error: 'Usage details not found for this user' });
    }
});


app.get('/billing/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userUsage = usageData[userId];
    if (userUsage) {
        const billingInfo = {
            lastBillingCycle: userUsage.lastBillingCycle,
            currentUsage: userUsage.usage,
            totalAmount: userUsage.usage * 0.5,
        };
        res.json(billingInfo);
    } else {
        res.status(404).json({ error: 'Billing information not found for this user' });
    }
});


app.post('/invoice/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find((u) => u.id === userId);

    if (user) {
        const userUsage = usageData[userId];
        if (userUsage) {
            
            const invoice = {
                id: invoices.length + 1,
                userId: userId,
                amount: userUsage.usage * 0.5, 
                generatedAt: new Date().toISOString(),
            };
            invoices[invoice.id] = invoice;
            res.json(invoice);
        } else {
            res.status(404).json({ error: 'Usage details not found for this user' });
        }
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
