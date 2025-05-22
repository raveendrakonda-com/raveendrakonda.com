const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your Gmail and an App Password (not your main password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_GMAIL_ADDRESS@gmail.com', // <-- replace with your Gmail
    pass: 'YOUR_APP_PASSWORD'             // <-- replace with your Gmail app password
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
      from: '"Website Bot" <YOUR_GMAIL_ADDRESS@gmail.com>', // <-- replace
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
