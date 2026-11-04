# Team 01 - Library Book Lending

| Team | Partner 1 | Partner 2 | Partner 3 | Project | Branch |
|---|---|---|---|---|---|
| 01 | Melvin  | Naman Choudhary | Gokul | [Library Book Lending](https://github.com/Naman20070/lending-book-libraray-project) | `main` |

---

## 1. What to Build (Problem Statement)
The department library needs a simple system to manage book lending and returns. It can be difficult to keep track of available books, borrowed books, student details, due dates, renewals, and overdue loans. Our project aims to make this process easier by providing a system where students can borrow, renew, and return books, while the librarian can manage books and monitor overdue loans.
---

## 2. Data

One SQLite file, library.db, with two tables.

| Table | Columns |
|---|---|
| `books` | `id`, `title`, `author`, `genre`, `total_copies`, `copies_available` |
| `loans` | `id`, `book_id`, `roll_no`, `borrowed_on`, `due_on`, `renewed` (0 or 1), `returned_on` (empty until returned) |

genre must be one of: textbook, fiction, reference, magazine, biography.
A loan is for 14 days. Renewing adds 7 days to due_on. A loan is overdue when it is not returned and due_on is before today.
Add 10 books and 5 loans to start with. Give at least one book 0 copies available, and make one loan overdue.


---

## 3. Who is Doing What

### Melvin 
- **Backend:**
  - `E4`: Change a book's total copies. Copies available go up or down by the same amount.
  - `E5`: Delete a book.
  - `E6`: Borrow a book with a roll number. The borrow date is today and the due date is 14 days later.

### Naman Choudhary
- **Backend:**
  - `E7`: Renew a loan. The due date moves 7 days later.
  - `E8`: Return a loan. The return date is today.
  - `E9`: Get one student's loans that aren't returned, by roll number. Each one includes the book's title and the due date.
  - `E10`: Get all overdue loans, with the book's title and the roll number.

### Gokul
- **Backend:**
  - `E1`: Get all the books. Can be filtered by genre and searched by title.
  - `E2`: Get one book by its id.
  - `E3`: Add a new book: title, author, genre and total copies. Copies available start equal to total copies.


---

## Stages 

- **Melvin's Stages**
  -`Stage 1`: worked on E4 
  -`stage 2`: worked on e5
  -`stage 3`:worked  on readme files
  -`stage 4`: worked on endpoints


## 4. API: 10 Endpoints

Run it on port **8001**, and add CORS so the React app can call it

Before you write any code, fill in the empty columns: method, path, request body, success code, and error codes.

| # | What it does | Method | Path | Request body | Success code | Error codes | Who |
|---|---|---|---|---|---|---|---|
| **E1** | Get all the books. Can be filtered by genre and searched by title. |  |  |  |  |  | Gokul |
| **E2** | Get one book by its id. |  |  |  |  |  | Gokul |
| **E3** | Add a new book: title, author, genre and total copies. Copies available start equal to total copies. |  |  |  |  |  | Gokul |
| **E4** | Change a book's total copies. Copies available go up or down by the same amount. | PATCH | `/books/copies/{book_id}` | None. Send `new_total_copies` as a query parameter, for example `?new_total_copies=22` | 200 | 400, 404, 422 | Melvin |
| **E5** | Delete a book. | DELETE | `/books/{book_id}` | None | 200 | 400, 404 | Melvin |
| **E6** | Borrow a book with a roll number. The borrow date is today and the due date is 14 days later. | POST | `/books/borrow/{book_id}` | None. Send `roll_no` as a query parameter, for example `?roll_no=AU25UG034` | 200 | 400, 404, 422 | Melvin |
| **E7** | Renew a loan. The due date moves 7 days later. |  |  |  |  |  | Naman |
| **E8** | Return a loan. The return date is today. |  |  |  |  |  | Naman |
| **E9** | Get one student's loans that aren't returned, by roll number. Each one includes the book's title and the due date. |  |  |  |  |  | Naman |
| **E10** | Get all overdue loans, with the book's title and the roll number. |  |  |  |  |  | Naman |
---

## 5. Rules the API Must Check

| Rule | Status |
|---|:---:|
| Borrowing a book with 0 copies available | 400 |
| Borrowing when the student already has 3 loans not returned | 400 |
| Borrowing when the student has an overdue loan | 400 |
| Borrowing a book the student already has (not returned) | 400 |
| Renewing a loan that was already renewed, or that is overdue | 400 |
| Renewing or returning a loan that was already returned | 400 |
| Deleting a book that has copies out on loan | 400 |
| Lowering total copies below the number of copies out on loan | 400 |
| A book or loan id that doesn't exist | 404 |
| A missing or empty field, a genre not in the list, or total_copies not between 1 and 20 | 422 |

- Borrowing takes 1 from `copies_available`, and returning adds 1 back.
- Every error sends a clear message: `{"detail": "This student already has 3 books."}`.

---

## 6. Endpoint tracker

Status: ✅ done · 🟡 in progress · ⬜ not started

| # | Method + path | Built | Rules checked in /docs | Connected to React | Who |
|---|---|---|---|---|---|
| E1 |  |  |  |  | Gokul |
| E2 |  |  |  |  | Gokul |
| E3 |  |  |  |  | Gokul |
| E4 | `PATCH /books/copies/{book_id}` | ✅ | 🟡 | ⬜ | Melvin |
| E5 | `DELETE /books/{book_id}` | ✅ | 🟡 | ⬜ | Melvin |
| E6 | `POST /books/borrow/{book_id}` | ✅ | 🟡 | ⬜ | Melvin |
| E7 |  |  |  |  | Naman |
| E8 |  |  |  |  | Naman |
| E9 |  |  |  |  | Naman |
| E10 |  |  |  |  | Naman |

---



