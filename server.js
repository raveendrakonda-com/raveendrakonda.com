const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // Parse JSON bodies

// Configure your email transporter (use your own email and app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_GMAIL_ADDRESS@gmail.com',
    pass: 'YOUR_APP_PASSWORD' // Use an App Password, NOT your Gmail password
  }
});

app.post('/send-visitor-details', async (req, res) => {
  const { name, contact, reason, searchQuery } = req.body;

  const htmlContent = `
    <h3>New Visitor Interaction</h3>
    <p><strong>Name:</strong> ${name || 'N/A'}</p>
    <p><strong>Contact:</strong> ${contact || 'N/A'}</p>
    <p><strong>Reason:</strong> ${reason || 'N/A'}</p>
    <p><strong>Search Query:</strong> ${searchQuery || 'N/A'}</p>
  `;

  try {
    await transporter.sendMail({
      from: '"Website Bot" <YOUR_GMAIL_ADDRESS@gmail.com>',
      to: 'raveendrakonda7@gmail.com',
      subject: 'New Visitor Interaction',
      html: htmlContent
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
