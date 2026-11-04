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
    if not result:
        raise HTTPException(status_code=404, detail="book id is invalid")
@app.get("/loans/overdue")
def api_get_overdue_loans():
    return functions.get_overdue_loans()

@app.get("/loans/student/{roll_no}")
def api_get_student_loans(roll_no: str):
    return functions.get_student_loans(roll_no)

@app.patch("/loans/{loan_id}/renew")
def api_renew_loan(loan_id: int):
    result = functions.renew_loan(loan_id)
    
    if "error" in result:
        raise HTTPException(status_code=result["status"], detail=result["error"])
        
    return result

@app.patch("/loans/{loan_id}/return")
def api_return_loan(loan_id: int):
    result = functions.return_loan(loan_id)
    
    if "error" in result:
        raise HTTPException(status_code=result["status"], detail=result["error"])
        
    return result