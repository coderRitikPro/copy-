const add = document.querySelector(".addcomment");
let allcomments = JSON.parse(window.localStorage.getItem("comments")) || [];

// Display existing comments from localStorage
window.addEventListener("DOMContentLoaded", () => {
    allcomments.forEach(comment => {
        createCommentElement(comment);
    });
});

add.addEventListener("click", (e) => {
    // Prevent default action if the add button is a form submit button
    e.preventDefault();

    let comment = document.querySelector(".addcomment input").value;

    if (comment.trim() !== "") {  // Ensure the comment is not empty
        allcomments.push(comment);
        window.localStorage.setItem("comments", JSON.stringify(allcomments));

        // Create and append the new comment element
        createCommentElement(comment);

        // Clear the input field
        document.querySelector(".addcomment input").value = "";
    }
});

// Function to create and append a comment element
function createCommentElement(comment) {
    // Create a new list item element
    const li = document.createElement("li");

    // Create a copy button
    const copybutton = document.createElement("button");
    copybutton.className = "copy";
    copybutton.textContent = "Copy";  // Add text to the button

    // Apply styles to the button
    copybutton.style.padding = "10px";
    copybutton.style.marginLeft = "10px"; // Add margin for spacing from the text
    copybutton.style.fontSize = "14px"; // Adjust font size
    copybutton.style.cursor = "pointer"; // Change cursor to pointer on hover

    // Set the list item text and append the copy button
    li.textContent = comment;
    li.appendChild(copybutton);

    // Append the new list item to the .allcomments element
    document.querySelector(".allcomments").appendChild(li);
}

// Add an event listener to the document for dynamically created copy buttons
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("copy")) {
        // Get the parent list item
        const li = e.target.parentElement;

        // Copy the content of the list item (excluding the button text)
        const commentText = li.firstChild.textContent;

        // Copy the comment text to the clipboard
        navigator.clipboard.writeText(commentText).then(() => {
            // Optionally, give feedback to the user
        
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    }
});
