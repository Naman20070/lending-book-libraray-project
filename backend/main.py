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

VALID_GENRES = ["textbook", "fiction", "reference", "magazine", "biography"]

@app.post("/books")
def add_new_book(title: str, author: str, genre: str, total_copies: int):
    if not title or not author or not genre:
        raise HTTPException(status_code=422, detail="Missing required field.")
    if genre not in VALID_GENRES:
        raise HTTPException(status_code=422, detail="Invalid genre.")
    if not (1 <= total_copies <= 20):
        raise HTTPException(status_code=422, detail="Total copies must be between 1 and 20.")
    return functions.add_book(title=title, author=author, genre=genre, total_copies=total_copies)

