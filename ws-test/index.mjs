import io from 'socket.io-client';

// Connect to the server with the access token
const socket = io('ws://localhost:3001/ws', {
  auth: {
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImxEZ0ZLcVctWmJZZGdnNVlNbGdqVCJ9.eyJpc3MiOiJodHRwczovL2Rldi02M3NnYnI3MC51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTAyNTg3OTY0NTI0MzQ3MzE0NzkiLCJhdWQiOlsiaHR0cHM6Ly9yZW1vdGVjdHIuY29tL2FwaSIsImh0dHBzOi8vZGV2LTYzc2dicjcwLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3Mjc1ODE4OTcsImV4cCI6MTcyNzY2ODI5Nywic2NvcGUiOiJvcGVuaWQgc2VuZDpjb21tYW5kIiwiYXpwIjoiY0pEOXBGa3NBS2xkaDlZenJkUjR6N2FWZlRBNzZWdG4ifQ.cfEwxg_uiAVv8v1ing_ZzrHW-cEG77H0crPusEUr3pru5ouee2fKHkb91x9cADFmV-ZNmdxM0cU8-A9q2ldviKEYObUxufv_Nt2uhqx5CVRej9rirQj5w6WCy86QVKGu5eWEq-BEstDpB0o_kSTSbJFDCiIBukaHMMBsPIsEx986gQRB3u9Atiz1LFIt3HEw5lnYw25oMm8K77WQAj3mzp4DdDILKiHFE_nCm37nFSmeadNp7ERS_VL0Q1MtCqqjHLxvjBdsgoauwUaH7Ob28AQuxiJYdaYK4z15i71aodfjv9C8Hek1ktu4FRvwyFn0wk0sq3mIWuOVdxolENdTqw'
  },
});

// Handle connection
socket.on('connect', () => {
  console.log('Connected to server');

  // Send a message to the server
  socket.emit('message', { msg: 'Hello from Electron!' });
});

// Handle messages from the server
socket.on('message', (data) => {
  console.log('Message from server:', data);
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Handle connection errors
socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});