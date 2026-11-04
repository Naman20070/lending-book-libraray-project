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