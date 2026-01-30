# ExpenseWise

ExpenseWise is a modern expense tracking application built with React, TypeScript, Tailwind CSS, and Firebase. It allows users to track their income and expenses, view analytics, and simulate deposits using Paystack.

## Features

- **Authentication**: Secure login and registration using Firebase Auth.
- **Dashboard**: Overview of current balance, income, and expenses.
- **Transactions**: Add, view, and delete transactions.
- **Analytics**: Visual breakdown of spending habits.
- **Payments**: Deposit funds using Paystack integration.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Prerequisites

Before running the application, ensure you have the following:

- Node.js (v16 or higher)
- A Firebase project
- A Paystack account (for public key)

## Setup Instructions

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Configure Firebase**

    - Go to [Firebase Console](https://console.firebase.google.com/).
    - Create a new project.
    - Enable **Authentication** (Email/Password provider).
    - Enable **Firestore Database** (Create database in test mode or set appropriate rules).
    - Copy your Firebase configuration keys.
    - Open `src/services/firebase.ts` and replace the placeholder values with your actual Firebase config:

    ```typescript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```

3.  **Configure Paystack**

    - Open `src/components/PaystackDeposit.tsx`.
    - Replace `PAYSTACK_PUBLIC_KEY` with your actual Paystack Public Key.

4.  **Run the Application**

    ```bash
    npm run dev
    ```

## Project Structure

- `src/components`: Reusable UI components (Navbar, Layout, Forms, Charts).
- `src/context`: React Context for state management (Auth).
- `src/hooks`: Custom hooks for data fetching (useTransactions).
- `src/pages`: Main application pages (Dashboard, Login, Register, Analytics).
- `src/services`: External service configurations (Firebase).
- `src/types`: TypeScript interfaces and types.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Charts**: Recharts
- **Backend**: Firebase (Auth, Firestore)
- **Payments**: React Paystack

# expense-wise
