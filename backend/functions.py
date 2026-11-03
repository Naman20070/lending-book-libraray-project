from sqlalchemy import Column, Integer, String , Boolean ,ForeignKey ,create_engine, DateTime
from sqlalchemy.orm import Session, declarative_base
from datetime import datetime, timedelta

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



def change_book_copies(book_id, new_total_copies):
    session = Session(engine)

    book = session.query(books).filter(books.id == book_id).first()

    if not book:
        session.close()
        return None

    copies_added = new_total_copies - book.total_copies

    new_copies_available = book.copies_available + copies_added

    if new_copies_available < 0:
        session.close()
        return "invalid_copies"

    book.total_copies = new_total_copies
    book.copies_available = new_copies_available

    session.commit()

    temp = {
        "id": book.id,
        "title": book.title,
        "total_copies": book.total_copies,
        "copies_available": book.copies_available
    }

    session.close()
    return temp

def delete_book(book_id):
    session = Session(engine)
    book = session.query(books).filter(books.id == book_id).first()
    if not book:
        session.close()
        return None
    session.delete(book)
    session.commit()
    session.close()

def borrow_book(book_id, roll_no):
    session = Session(engine)

    borrowed_on = datetime.now()
    due_on = borrowed_on + timedelta(days=14)

    loan = loans(
        book_id=book_id,
        roll_no=roll_no,
        borrowed_on=borrowed_on,
        due_on=due_on
    )

    session.add(loan)
    session.commit()
    session.close()
