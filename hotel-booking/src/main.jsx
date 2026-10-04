import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { Authprovider } from './components/context/userauth.jsx'
import { BookingAvailabilityProvider } from './components/context/BookingAvailabilityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <BookingAvailabilityProvider>

        <App />

      </BookingAvailabilityProvider>
    </Authprovider>
  </StrictMode>
)