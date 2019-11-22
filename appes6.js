class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    addBookToList(book){
        const list =document.getElementById('book-list');
        //create tr element
        const row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='delete'>X</a></td>
        `;
        list.appendChild(row);
    }
    clearFields(){
        document.getElementById('title').value = '',
        document.getElementById('author').value = '',
        document.getElementById('isbn').value = '';
    }
    showAlert(message,className){
        //create div
        const div =document.createElement('div');
        //Add Classes
        div.className = `alert ${className}`;
        //Add Text
        div.appendChild(document.createTextNode(message));
        //get Parent
        const container = document.querySelector('.container');
        const form =document.getElementById('book-form');
        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },2000);
    }
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
}

//Event Listeners for Adding Book 
document.getElementById('book-form').addEventListener('submit',function(e){
    //Get Form Values
    let title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    // console.log(title,author,isbn);

    //Instantiate Book
    const book = new Book(title,author,isbn);
    // console.log(book);

    //Instantiate UI
    let ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === ''){
        //Show Alert Message as Invalid
        ui.showAlert('Please Fill All The Fields','error');
    }else{
        //Show Success Message
        ui.showAlert('Book Added!','success');
        //Add Book To Booklist
        ui.addBookToList(book);
        //clear Input Fields
        ui.clearFields();   
    }
    e.preventDefault();
});

//Event Listeners for Deleting Book
document.getElementById('book-list').addEventListener('click',function(e){
    //Instantiate UI
    const ui = new UI();
    //delete Book
    ui.deleteBook(e.target);
    //show Alert Message
    ui.showAlert('Book Removed','success');
    e.preventDefault();
});
