
let users = [
    { id: 1, email: 'user@example.com', name: 'John Doe' },
    
  ];
  
  
  let usageData = {
    1: { usage: 100, lastBillingCycle: '2023-11-01' },
  };
  
  
  let invoices = {
    1: { id: 1, userId: 1, amount: 50, generatedAt: '2023-12-01' },
  };
  
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
          id: Object.keys(invoices).length + 1,
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
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  