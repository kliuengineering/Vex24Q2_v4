
const path = require('path');


// Serve static files from the 'public' directory


const express = require('express');
const dgram = require('dgram');
const bodyParser = require('body-parser'); // To parse JSON body content
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.static('public')); // Serve static files
app.use(bodyParser.json()); // Parse JSON bodies

// Helper function to send UDP data
function sendUDPData(hostname, port, message) {
  const client = dgram.createSocket('udp4');
  const messageBuffer = Buffer.from(message);

  client.send(messageBuffer, port, hostname, (err) => {
    if (err) {
      console.error('Failed to send message', err);
    } else {
      console.log(`Message sent to ${hostname}:${port}`);
    }
    client.close();
  });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/pose.html'));
  });

// Route to trigger UDP send
app.post('/sendudp', (req, res) => {
  const { hostname, port, message } = req.body;
  if (!hostname || !port || !message) {
    return res.status(400).send('Missing hostname, port, or message in request body');
  }

  sendUDPData(hostname, port, message);
  res.send('UDP message sent');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
