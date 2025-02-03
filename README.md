# Library Lending System Built with React and Flask  
#### By **Abdul Aljawaab**  

## Description  
The **Library Lending System** is a web application that allows librarians to manage books, students, and borrowing records. The system includes features for adding new books, registering students, lending books, and managing borrowing records. It uses a Flask backend for data management and a React frontend for a user-friendly interface.

---

## How to Use  
### Requirements    
* Python 3.6 or higher installed on your system.  
* Flask for the backend API.  
* React for the frontend.  

### Setup Instructions  
1. **Clone the Repository**:  
    ```bash  
    git clone https://github.com/Aljawaab/Library_Lending_System.git 
    cd Library_Lending_System  
    ```

2. **Set Up the server (Backend)**:  
    Navigate to the server directory:  
    ```bash  
    cd server  
    ```  
    Install Python dependencies:  
    ```bash  
    pipenv install 
    ```  
    Run the Flask server:  
    ```bash  
    python app.py  
    ```  

3. **Set Up the client (Frontend)**:  
    Navigate to the frontend directory:  
    ```bash  
    cd ../client  
    ```  
    Install Node.js dependencies:  
    ```bash  
    npm install  
    ```  
    Start the React development server:  
    ```bash  
    npm run dev  
    ```  

4. **Access the Application**:  
    Open your browser and navigate to [http://localhost:

## Features  
* **Add New Books**: Add books with details like title, author, and number of copies.  
* **Manage Borrowing Records**: View, update, and delete borrowing records.  
* **Lend Books**: Lend books to students by filling out a lending form.  
* **Add Students**: Add new students to the system.  
* **Responsive Design**: The application is designed to work seamlessly on all devices.

## Technologies Used  
* **React**: Frontend framework for building the user interface.  
* **Flask**: Backend framework for handling API requests.  
* **SQLite**: Database for persistent data storage.  
* **Axios**: For making HTTP requests to the backend.  
* **CSS**: For styling the application.

## Navigation Instructions  
When you open the application, you will see a navigation bar with the following options:  
* **Home**: The homepage of the application.  
* **Add New Book**: Navigate to the form for adding new books.  
* **Borrowing Records**: View and manage borrowing records.  
* **Lend Book**: Navigate to the form for lending books to students.  
* **Add Student**: Navigate to the form for adding new students.

## Files in the Project  
### Backend (server) 
* **app.py**: The main Flask application file.  
* **models.py**: Contains the database models for students, books, and lendings.  

### Frontend (client) 
* **src/AddNewBook.js**: Component for adding new books.  
* **src/BorrowingRecords.js**: Component for managing borrowing records.  
* **src/LendingForm.js**: Component for lending books.  
* **src/StudentForm.js**: Component for adding new students.  
* **src/Home.js**: The homepage component.  
* **src/Navbar.js**: The navigation bar component.  
* **src/App.js**: The main React application file.  
* **src/index.css**: Global styles for the application.

## Future Enhancements  
* Add a search feature to find specific books, students, or borrowing records.  
* Implement user authentication for librarians.  
* Add pagination for the borrowing records table.  
* Improve error handling and user feedback.

## License  
MIT License  

```
© 2025 Abdul Aljawaab

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
