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



@app.patch("/books/{book_id}/copies")
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

@app.post("/books/{book_id}/borrow")
def borrow_book(book_id: int, roll_no: str):
    result = functions.borrow_book(book_id=book_id, roll_no=roll_no)
    if not result:
        raise HTTPException(status_code=404, detail="book id is invalid")
    return result