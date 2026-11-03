from sqlalchemy import Column, Integer, String , Boolean ,ForeignKey ,create_engine, DateTime
from sqlalchemy.orm import Session, declarative_base
from datetime import datetime

DB_PATH = "Library.db"
engine = create_engine(f"sqlite:///{DB_PATH}")
Base = declarative_base()

class books(Base):
    __tablename__  = "books"
    id = Column(Integer , primary_key=True)
    title = Column(String)
    author = Column(String)
    genre = Column(String)
    total_copies = Column(Integer)
    copies_available = Column(Integer)

class loans(Base):
    __tablename__ = "loans"
    id = Column(Integer , primary_key=True)
    book_id = Column(Integer , ForeignKey("books.id"))
    roll_no = Column(String)
    borrowed_on = Column(DateTime ,default =  datetime.now)
    due_on = Column(DateTime)
    renewed= Column(Boolean)
    returned_on = Column(DateTime , nullable=True)

Base.metadata.create_all(engine) 

def get_books(genre=None, title=None):
    session = Session(engine)
    query = session.query(books)
    if genre:
        query = query.filter(books.genre == genre)
    if title:
        query = query.filter(books.title.ilike(f"%{title}%"))
    response = []
    for book in query:
        temp = {
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "genre": book.genre,
            "total_copies": book.total_copies,
            "copies_available": book.copies_available
        }
        response.append(temp)
    session.close()
    return response

def get_one_book(id: int):
    session = Session(engine)
    book = session.query(books).filter(books.id == id).first()
    if not book:
        session.close()
        return None
    
    temp = {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "genre": book.genre,
        "total_copies": book.total_copies,
        "copies_available": book.copies_available
    }
    session.close()
    return temp

def add_new_book(title, author, genre, total_copies):
    session = Session(engine)
    book = books(
        title=title,
        author=author,
        genre=genre,
        total_copies=total_copies,
        copies_available=total_copies
    )
    session.add(book)
    session.commit()
    session.refresh(book)
    
    temp = {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "genre": book.genre,
        "total_copies": book.total_copies,
        "copies_available": book.copies_available
    }
    session.close()
    return temp