from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import functions

app = FastAPI(
    title = "Libary Book Lending API",
    description = "Manage Lending Library Books"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/books")
def get_books(genre: str = None, title: str = None):
    return functions.get_books(genre=genre, title=title)

@app.get("/books/{id}")
def get_one_book(id: int):
    result = functions.get_one_book(id=id)
    if not result:
        raise HTTPException(status_code=404, detail="Book not found")
    return result

VALID_GENRES = ["Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Mystery"]

@app.post("/books")
def add_new_book(title: str, author: str, genre: str, total_copies: int):
    if genre not in VALID_GENRES:
        raise HTTPException(status_code=422, detail="Genre not in the list")
        
    result = functions.add_new_book(title=title, author=author, genre=genre, total_copies=total_copies)
    
    if "error" in result:
        raise HTTPException(status_code=result["status_code"], detail=result["error"])
        
    return result

@app.get("/loans/overdue")
def get_overdue_loans():
    return functions.get_overdue_loans()

@app.get("/loans/student/{roll_no}")
def get_student_loans(roll_no: str):
    return functions.get_student_loans(roll_no)

@app.patch("/loans/{loan_id}/renew")
def renew_loan(loan_id: int):
    result = functions.renew_loan(loan_id)
    
    if "error" in result:
        raise HTTPException(status_code=result["status"], detail=result["error"])
        
    return result

@app.patch("/books/copies/{book_id}")
def change_book_copies(book_id: int, new_total_copies: int):
    if new_total_copies < 1 or new_total_copies > 20:
        raise HTTPException(status_code=422, detail="total copies must be between 1 and 20")

    result = functions.change_book_copies(book_id=book_id, new_total_copies=new_total_copies)

    if "error" in result:
        raise HTTPException(status_code=result["status"], detail=result["error"])

    return result

@app.delete("/books/{book_id}")
def remove_book(book_id: int):
    result = functions.delete_book(book_id)

    if "error" in result:
        raise HTTPException(status_code=result["status"], detail=result["error"])

    return result

@app.post("/books/borrow/{book_id}")
def borrow_book(book_id: int, roll_no: str):
    if roll_no.strip() == "":
        raise HTTPException(status_code=422, detail="roll no cannot be empty")

    result = functions.borrow_book(book_id=book_id, roll_no=roll_no)

    if "error" in result:
        raise HTTPException(status_code=result["status"], detail=result["error"])

    return result
  
@app.patch("/loans/{loan_id}/return")
def return_loan(loan_id: int):
    result = functions.return_loan(loan_id)
    
    if "error" in result:
        raise HTTPException(status_code=result["status"], detail=result["error"])
        
    return result