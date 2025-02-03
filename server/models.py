from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(80), nullable=False)
    ClassName = db.Column(db.String(80), nullable=False)
    
    lendings = db.relationship('Lending', back_populates='student', cascade="all, delete-orphan")

    serialize_rules = ('-lendings.student', '-lendings.book') 

    def __repr__(self):
        return f"<Student {self.Name}, Class: {self.ClassName}>"
    
    def to_dict(self):
        return {
            "Name": self.Name,
            "Class": self.ClassName,
            "Student ID": self.id   
        }
    
    @validates("Name")
    def validate_name(self, key, value):
        if not value or len(value.strip()) < 2:
            raise ValueError("Student Name must have at least 2 characters")
        return value.strip().title() 

    @validates("ClassName")
    def validate_class_name(self, key, value):
        if not value or len(value.strip()) < 1:
            raise ValueError("Class Name cannot be empty")
        return value.strip().title()
    

class Lending(db.Model, SerializerMixin):
    __tablename__ = 'lendings'

    id = db.Column(db.Integer, primary_key=True)
    Student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    Book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    BorrowDate = db.Column(db.String(80), nullable=False)
    ReturnDate = db.Column(db.String(80), nullable=False)
    
    student = db.relationship('Student', back_populates='lendings')
    book = db.relationship('Book', back_populates='lendings')

    serialize_rules = ('-student.lendings', '-book.lendings')

    def __repr__(self):
        return f"<Lending Student: {self.Student_ID}, Book: {self.Book_ID}, Borrowed: {self.BorrowDate}, Returned: {self.ReturnDate}>"

    def to_dict(self):
        """Return all attributes except primary keys and foreign keys in a single row."""
        return {
            "Student ID": self.student.id if self.student else None,
            "Lending ID": self.id,
            "Student Name": self.student.Name if self.student else None,
            "Class": self.student.ClassName if self.student else None,
            "Book ID": self.book.id if self.book else None,
            "Book Title": self.book.Title if self.book else None,
            "Author": self.book.Author if self.book else None,
            "Borrow Date": self.BorrowDate,
            "Return Date": self.ReturnDate
        }
    
    @validates("BorrowDate", "ReturnDate")
    def validate_dates(self, key, value):
        if not value or len(value.strip()) < 1:
            raise ValueError(f"{key} cannot be empty")
        return value.strip()
    

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(80), nullable=False)
    Author = db.Column(db.String(80), nullable=False)
    NumberOfBooks = db.Column(db.Integer, nullable=False)
    
    lendings = db.relationship('Lending', back_populates='book', cascade="all, delete-orphan")

    serialize_rules = ('-lendings.book', '-lendings.student')

    def to_dict(self):
        return {
            "Book ID": self.id,
            "Title": self.Title,
            "Author": self.Author,
            "Available Copies": self.NumberOfBooks
            
        }
    
    @validates("Author")
    def validate_author(self, key, value):
        if not value or len(value.strip()) < 1:
            raise ValueError("Author Name cannot be empty")
        return value.strip().title()

    @validates("NumberOfBooks")
    def validate_number_of_books(self, key, value):
        if value < 1:
            raise ValueError("Number of books must be at least 1")
        return value

    def __repr__(self):
        return f"<Book {self.Title} by {self.Author}, Copies: {self.NumberOfBooks}>"
