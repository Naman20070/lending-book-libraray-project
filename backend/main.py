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