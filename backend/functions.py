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



def add_book(title, author, genre, total_copies):
    session = Session(engine)
    new_book = books(
        title=title,
        author=author,
        genre=genre,
        total_copies=total_copies,
        copies_available=total_copies
    )
    session.add(new_book)
    session.commit()
    temp = {
        "id": new_book.id,
        "title": new_book.title,
        "author": new_book.author,
        "genre": new_book.genre,
        "total_copies": new_book.total_copies,
        "copies_available": new_book.copies_available
    }
    session.close()
    return temp