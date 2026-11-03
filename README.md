# Team 01 - Library Book Lending

| Team | Partner 1 | Partner 2 | Partner 3 | Project | Branch |
|---|---|---|---|---|---|
| 01 | Melvin  | Naman Choudhary | Gokul | [Library Book Lending](https://github.com/Naman20070/lending-book-libraray-project) | `main` |

---


## 1 Problem Statement
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

### Melvin Jacob
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

