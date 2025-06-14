# GitHub Repositories Explorer

A modern web application built with **React**, **Redux**, **Zod**, and **TypeScript** that allows users to explore public GitHub repositories by entering a username. Fully typed, validated, and tested with **Jest + React Testing Library**.

---

## Features

* Search GitHub users and fetch their public repositories
* Form validation using **Zod** + **React Hook Form**
* State management with **Redux Toolkit** and **Redux-Saga/Thunk**
* Responsive UI with **Tailwind CSS**
* Full unit testing using **Jest** and **Testing Library**
* Created using **Create React App (CRA)** with **TypeScript**

---

## Tech Stack

| Technology            | Description                                |
| --------------------- | ------------------------------------------ |
| React 19              | Frontend library                           |
| TypeScript            | Type-safe JavaScript                       |
| Redux Toolkit         | State management                           |
| Redux Thunk           | Async logic (also supports saga if needed) |
| React Hook Form + Zod | Form handling & validation                 |
| Tailwind CSS          | Utility-first CSS framework                |
| Axios                 | API calls to GitHub                        |
| Jest                  | JavaScript testing framework               |
| React Testing Library | Component/unit testing                     |

---

## Folder Structure

```bash
src/
├── api/                # Axios logic
├── components/         # Reusable UI components (atoms/molecules)
├── data/               # Put constant variable
├── pages/              # Application views/pages
├── redux/              # Redux slices, sagas, selectors
├── styles/             # Css global styles
├── types/              # Global types can be accessed anywhere
├── validation/         # Zod schemas
└── App.tsx             # Root component
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/apclarity/github-repositories-explorer.git
cd github-repositories-explorer
```

### 2. Install dependencies

```bash
npm install
```

---

## Run tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

---

## Run the development server

```bash
npm start
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## Example Usage

1. Open the app
2. Enter a valid GitHub username 
3. View a list of public repositories
4. Handle loading/error/empty state 

---

## Validation

This project uses Zod along with @hookform/resolvers to validate the GitHub username input field.
The validation rules are:

* Minimum 3 characters
* Maximum 39 characters
* Cannot be empty
* Must be alphanumeric or hyphen
* Cannot start or end with a hyphen
* Cannot contain consecutive hyphens

```ts
const schema = z.object({
  username: z
    .string()
    .min(3, {message: 'Username must be at least 3 characters long'})
    .max(39, { message: 'Username must be at most 39 characters' })
    .nonempty({message: 'Please enter a Github username'})
    .regex(
        /^(?!-)(?!.*--)[a-zA-Z0-9-]+(?<!-)$/,
        {
            message:
            'Username must be alphanumeric or hyphen, cannot start or end with hyphen, or contain consecutive hyphens',
        }
    )
});
```
