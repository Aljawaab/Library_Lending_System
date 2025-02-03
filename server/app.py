from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import db, Student, Lending, Book
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
cors = CORS(app, origins="*")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)


@app.errorhandler(404)
def not_found(e):
    return {"error": "Resource not found"}, 404


@app.errorhandler(500)
def server_error(e):
    return {"error": "Internal server error"}, 500


class Home(Resource):
    def get(self):
        return {"message": "Welcome to the Library Management System"}, 200


class StudentListResource(Resource):
    def get(self):
        students = Student.query.all()
        return {"data": [student.to_dict() for student in students]}, 200

    def post(self):
        data = request.get_json()
        name = data.get("Name")
        class_name = data.get("ClassName")

        if not name or not class_name:
            return {"error": "Name and ClassName are required"}, 400

        new_student = Student(Name=name, ClassName=class_name)
        db.session.add(new_student)
        db.session.commit()
        return {"data": new_student.to_dict(), "message": "Student created successfully"}, 201


class StudentResource(Resource):
    def get(self, student_id):
        student = Student.query.get(student_id)
        if student:
            return {"data": student.to_dict()}, 200
        return {"error": "Student not found"}, 404

    def patch(self, student_id):
        student = Student.query.get(student_id)
        if not student:
            return {"error": "Student not found"}, 404

        data = request.get_json()
        if "Name" in data:
            student.Name = data["Name"]
        if "ClassName" in data:
            student.ClassName = data["ClassName"]

        db.session.commit()
        return {"data": student.to_dict(), "message": "Student updated successfully"}, 200

    def delete(self, student_id):
        student = Student.query.get(student_id)
        if not student:
            return {"error": "Student not found"}, 404

        db.session.delete(student)
        db.session.commit()
        return {"message": f"Student {student_id} and related data deleted successfully"}, 200


class BookListResource(Resource):
    def get(self):
        books = Book.query.all()
        return {"data": [book.to_dict() for book in books]}, 200

    def post(self):
        data = request.get_json()
        title = data.get("Title")
        author = data.get("Author")
        number_of_books = data.get("NumberOfBooks")

        if not title or not author or number_of_books is None:
            return {"error": "Title, Author, and NumberOfBooks are required"}, 400

        new_book = Book(Title=title, Author=author, NumberOfBooks=number_of_books)
        db.session.add(new_book)
        db.session.commit()
        return {"data": new_book.to_dict(), "message": "Book created successfully"}, 201


class LendingListResource(Resource):
    def get(self):
        lendings = Lending.query.all()
        return {"data": [lending.to_dict() for lending in lendings]}, 200

    def post(self):
        data = request.get_json()
        student_id = data.get("Student_id")
        book_id = data.get("Book_id")
        borrow_date = data.get("BorrowDate")
        return_date = data.get("ReturnDate")

        if not all([student_id, book_id, borrow_date, return_date]):
            return {"error": "Student_id, Book_id, BorrowDate, and ReturnDate are required"}, 400

        new_lending = Lending(
            Student_id=student_id, Book_id=book_id, BorrowDate=borrow_date, ReturnDate=return_date
        )
        db.session.add(new_lending)
        db.session.commit()
        return {"data": new_lending.to_dict(), "message": "Lending created successfully"}, 201


class LendingResource(Resource):
    def get(self, lending_id):
        lending = Lending.query.get(lending_id)
        if lending:
            return {"data": lending.to_dict()}, 200
        return {"error": "Lending not found"}, 404
    
    def patch(self, lending_id):
        lending = Lending.query.get(lending_id)
        if not lending:
            return {"error": "Lending not found"}, 404

        data = request.get_json()
        if "BorrowDate" in data:
            lending.BorrowDate = data["BorrowDate"]
        if "ReturnDate" in data:
            lending.ReturnDate = data["ReturnDate"]

        db.session.commit()
        return {"data": lending.to_dict(), "message": "Lending updated successfully"}, 200

    def delete(self, lending_id):
        lending = Lending.query.get(lending_id)
        if not lending:
            return {"error": "Lending not found"}, 404

        db.session.delete(lending)
        db.session.commit()
        return {"message": f"Lending {lending_id} deleted successfully"}, 200


# API resources
api.add_resource(Home, "/")
api.add_resource(StudentListResource, "/students")
api.add_resource(StudentResource, "/students/<int:student_id>")
api.add_resource(BookListResource, "/books")
api.add_resource(LendingListResource, "/lendings")
api.add_resource(LendingResource, "/lendings/<int:lending_id>")






if __name__ == "__main__":
    app.run(debug=True, port=5555)
