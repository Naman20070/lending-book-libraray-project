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

@app.post("/books")
def add_new_book(title: str, author: str, genre: str, total_copies: int):
    return functions.add_new_book(title=title, author=author, genre=genre, total_copies=total_copies)

@app.patch("/books/copies/{book_id}")
def change_book_copies(book_id: int, new_total_copies: int):
    result = functions.change_book_copies(book_id=book_id, new_total_copies=new_total_copies)

    if result == "invalid_copies":
        raise HTTPException(status_code=400, detail="Invalid number of copies.")

    if result is None:
        raise HTTPException(status_code=404, detail="book id is invalid.")

    return result

@app.delete("/books/{book_id}")
def remove_book(book_id: int):
    result = functions.delete_book(book_id)
    if result is None:
        raise HTTPException(status_code=404, detail="book not found")
    return result

@app.post("/books/borrow/{book_id}")
def borrow_book(book_id: int, roll_no: str):
    result = functions.borrow_book(book_id=book_id, roll_no=roll_no)

    if result is None:
        raise HTTPException(status_code=404, detail="book id is invalid")

    if result == "no_copies":
        raise HTTPException(status_code=400, detail="no copies available")
        
    return result
  
  
  
  

@app.patch("/loans/{loan_id}/return")
def api_return_loan(loan_id: int):
    result = functions.return_loan(loan_id)
    
    if "error" in result:
        raise HTTPException(status_code=result["status"], detail=result["error"])
        
    return result
