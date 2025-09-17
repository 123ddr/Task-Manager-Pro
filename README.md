# Task Manager Pro

A simple task manager application inspired by Trello, built with **React**, **Ant Design (antd)**, **SCSS**, and **React Router v6**. The app allows users to manage tasks within boards and lists, including adding, editing, moving, and deleting tasks.  

---

## Features

- **Boards List Page (`/boards`)**
  - Displays hard-coded board cards (e.g., "Personal Tasks," "Team Board").
  - Each card shows the board name and a short description.
  - Clicking a board card navigates to the board page.

- **Single Board Page (`/boards/:id`)**
  - Displays multiple lists/columns (e.g., "To Do," "In Progress," "Done").
  - Each list contains task cards.
  - Users can:
    - Add new tasks.
    - Edit task title and description via modal.
    - Move tasks between lists.
    - Delete tasks.
  - Extra Feature: **Task Favorites** (mark tasks as favorites and show favorite count).

- **Routing**
  - React Router v6 for navigation.
  - `/boards` → Boards list page.
  - `/boards/:id` → Single board page.

- **State Management**
  - `useReducer` manages board state (lists and tasks).

- **API & Data**
  - Mocked API using a custom hook (`useBoardApi`) for GET, POST, PATCH/PUT, and DELETE operations.
  - Handles loading and error states.

- **Styling**
  - SCSS for modular styles.
  - Ant Design components (`Card`, `Button`, `Modal`, etc.) for consistent UI.
