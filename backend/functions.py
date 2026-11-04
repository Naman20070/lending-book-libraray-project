from sqlalchemy import Column, Integer, String , Boolean ,ForeignKey ,create_engine, DateTime
from sqlalchemy.orm import Session, declarative_base
from datetime import date, timedelta

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
    borrowed_on = Column(DateTime ,default =  date.today)
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

    copies_out = session.query(loans).filter(
        loans.book_id == book_id,
        loans.returned_on.is_(None)
    ).count()

    if copies_out > 0:
        session.close()
        return "on_loan"

    session.delete(book)
    session.commit()
    session.close()
    return "book deleted"

def borrow_book(book_id, roll_no):

    session = Session(engine)

    book = session.query(books).filter(books.id == book_id).first()

    if not book:
        session.close()
        return None

    if book.copies_available <= 0:
        session.close()
        return "no_copies"

    student_loans = session.query(loans).filter(loans.roll_no == roll_no,loans.returned_on.is_(None)).all()

    if len(student_loans) >= 3:
        session.close()
        return "limit_reached"

    for old_loan in student_loans:
        if old_loan.due_on.date() < date.today():
            session.close()
            return "overdue"
        elif old_loan.book_id == book_id:
            session.close()
            return "already_borrowed"

    borrowed_on = date.today()
    due_on = borrowed_on + timedelta(days=14)

    loan = loans(
        book_id=book_id,
        roll_no=roll_no,
        borrowed_on=borrowed_on,
        due_on=due_on,
        renewed=False
    )

    book.copies_available = book.copies_available - 1

    session.add(loan)
    session.commit()

    temp = {
        "loan_id": loan.id,
        "book_id": book_id,
        "roll_no": roll_no,
        "borrowed_on": str(borrowed_on),
        "due_on": str(due_on)
    }

    session.close()
    return temp

def renew_loan(loan_id: int):
    session = Session(engine)
    loan = session.query(loans).filter(loans.id == loan_id).first()
    
    if not loan:
        session.close()
        return {"error": "Loan not found", "status": 404}
    if loan.returned_on:
        session.close()
        return {"error": "Loan already returned", "status": 400}
    if loan.renewed:
        session.close()
        return {"error": "Loan already renewed", "status": 400}
    if loan.due_on.date() < date.today():
        session.close()
        return {"error": "Cannot renew an overdue loan", "status": 400}
        
    loan.due_on = loan.due_on + timedelta(days=7)
    loan.renewed = True
    session.commit()
    
    temp = {
        "id": loan.id,
        "book_id": loan.book_id,
        "roll_no": loan.roll_no,
        "due_on": loan.due_on,
        "renewed": loan.renewed
    }
    session.close()
    return temp

def return_loan(loan_id: int):
    session = Session(engine)
    loan = session.query(loans).filter(loans.id == loan_id).first()
    
    if not loan:
        session.close()
        return {"error": "Loan not found", "status": 404}
    if loan.returned_on:
        session.close()
        return {"error": "Loan already returned", "status": 400}
        
    loan.returned_on = date.today()
    
    book = session.query(books).filter(books.id == loan.book_id).first()
    if book:
        book.copies_available += 1
        
    session.commit()
    
    temp = {
        "id": loan.id,
        "book_id": loan.book_id,
        "roll_no": loan.roll_no,
        "returned_on": loan.returned_on
    }
    session.close()
    return temp

def get_student_loans(roll_no: str):
    session = Session(engine)
    
    active_loans = session.query(loans).filter(
        loans.roll_no == roll_no,
        loans.returned_on.is_(None)
    ).all()
    
    response = []
    for loan in active_loans:
        book = session.query(books).filter(books.id == loan.book_id).first()
        
        if book:
            response.append({
                "id": loan.id,
                "book_id": loan.book_id,
                "title": book.title,
                "due_on": loan.due_on,
                "renewed": loan.renewed
            })
            
    session.close()
    return response

def get_overdue_loans():
    session = Session(engine)
    active_loans = session.query(loans).filter(
        loans.returned_on.is_(None)
    ).all()
    
    overdue = []
    for loan in active_loans:
        if loan.due_on and loan.due_on.date() < date.today():
            overdue.append(loan)
            
    response = []
    for loan in overdue:
        book = session.query(books).filter(books.id == loan.book_id).first()
        
        if book:
            response.append({
                "id": loan.id,
                "book_id": loan.book_id,
                "title": book.title,
                "roll_no": loan.roll_no,
                "due_on": loan.due_on
            })
            
    session.close()
    return response
