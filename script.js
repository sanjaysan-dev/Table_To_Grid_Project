document.addEventListener("DOMContentLoaded", () => {
    const usersGridElement = document.getElementById("users-grid");
    const usersTableElement = document.getElementById("users-table");
    const usersTableBodyElement = document.getElementById("users-table-body");
    const userDetailsElement = document.getElementById("user-details");
    const userNameElement = document.getElementById("user-name");
    const userEmailElement = document.getElementById("user-email");
    const userUserNameElement = document.getElementById("user-username");
    const userAddressStreetElement = document.getElementById("address-street");
    const userAddressSuiteElement = document.getElementById("address-suite");
    const userAddressCityElement = document.getElementById("address-city");
    const userAddressZipcodeElement = document.getElementById("address-zipcode");
    const userPhoneElement = document.getElementById("user-phone");
    const userWesiteElement = document.getElementById("user-website");
    const userCompanyName = document.getElementById("user-companyname");
    const userCompanyCatchphraseElement = document.getElementById("user-comapnycatchphrase");
    const userCompanyBsElement = document.getElementById("user-comapnybs");

    const todosListElement = document.getElementById("todos-list");
    const postsListElement = document.getElementById("posts-list");
  
    const showTodosButton = document.getElementById("show-todos");
    const showPostsButton = document.getElementById("show-posts");
  
    const gridViewButton = document.getElementById("grid-view-btn");
    const tableViewButton = document.getElementById("table-view-btn");
    const searchBar = document.getElementById("search-bar");
    const sortButton = document.getElementById('sort-btn');
  
    let usersData = [];
    let isAscending = true;

    // Fetch users and display in grid or table
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => {
        usersData = users;
        displayUsersGrid(users);  // Initially display users in grid view
      });
  
    // Function to display users in grid format
    function displayUsersGrid(users) {
      usersGridElement.innerHTML = ""; // Clear existing grid
      users.forEach(user => {
          const userCard = document.createElement("div");
          userCard.classList.add("user-card");
          userCard.innerHTML = `
              <h2>${user.name}</h2>
              <h3>${user.email}</h3>
              <p>UserName: ${user.username}</p>
              <p>Phone: ${user.phone}</p>
              <p>Wesite: ${user.website}</p>
              <p>Address & Street: ${user.address.street}, Suite: ${user.address.suite}, City: ${user.address.city}, ZipCode: ${user.address.zipcode}</p>
              <p>Company Name: ${user.company.name}, CatchPhrase: ${user.company.catchPhrase}, Bs: ${user.company.bs}</p>
              
              
              <button onclick="showUserDetails(${user.id})">View Details</button>
          `;
          usersGridElement.appendChild(userCard);
      });
  }

  
    // Function to display users in table format
    function displayUsersTable(users) {
      usersTableBodyElement.innerHTML = ""; // Clear existing table rows
      users.forEach(user => {
          const userRow = document.createElement("tr");
          userRow.innerHTML = `
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.username}</td>
              <td>${user.address.street}</td>
              <td>${user.address.suite}</td>
              <td>${user.address.city}</td>
              <td>${user.address.zipcode}</td>
              <td>${user.phone}</td>
              <td>${user.website}</td>
              <td>${user.company.name}</td>
              <td>${user.company.catchPhrase}</td>
              <td>${user.company.bs}</td>
              
              <td><button onclick="showUserDetails(${user.id})">View Details</button></td>
          `;
          usersTableBodyElement.appendChild(userRow);
      });
  }
  
 
    // Handle search bar input
    searchBar.addEventListener("input", () => {
      const query = searchBar.value.trim();
      searchUsers(query);
  });

     // Search function to filter users
     function searchUsers(query) {
      const filteredUsers = usersData.filter(user =>
          user.name.toLowerCase().includes(query.toLowerCase()) 
      );
  
      // Check the currently active view and update accordingly
      if (usersGridElement.style.display !== "none") {
          displayUsersGrid(filteredUsers);
          
      } else {
          displayUsersTable(filteredUsers);
      }
  }
  
    // Switch to Grid View
    gridViewButton.addEventListener("click", () => {
      usersGridElement.style.display = "grid";
      usersTableElement.style.display = "none";
      gridViewButton.disabled = true;
      tableViewButton.disabled = false;
      
      const query = searchBar.value.trim();
      searchUsers(query); // Apply current search filter
      
  });
  
    // Switch to Table View
    
 tableViewButton.addEventListener("click", () => {
  usersGridElement.style.display = "none";
  usersTableElement.style.display = "table";  
  tableViewButton.disabled = true;
  gridViewButton.disabled = false;

  
  const query = searchBar.value.trim();
  searchUsers(query); // Apply current search filter
  
  });
  
    // Show user details, todos, and posts
    window.showUserDetails = function(userId) {
      // Hide users list and show user details section
      usersGridElement.style.display = "none";
      usersTableElement.style.display = "none";
      userDetailsElement.style.display = "block";
      // Fetch user details
      const user = usersData.find(user => user.id === userId);
      userNameElement.textContent = user.name;
      userEmailElement.textContent = user.email;
      userUserNameElement.textContent = user.username;
      userAddressStreetElement.textContent = user.address.street;
      userAddressSuiteElement.textContent = user.address.suite;
      userAddressCityElement.textContent = user.address.city;
      userAddressZipcodeElement.textContent = user.address.zipcode;
      userPhoneElement.textContent = user.phone;
      userWesiteElement.textContent = user.website;
      userCompanyName.textContent = user.company.name;
      userCompanyCatchphraseElement.textContent = user.company.catchPhrase;
      userCompanyBsElement.textContent = user.company.bs;

      
      
      // Fetch todos and posts for the user
      fetchTodosAndPosts(userId);
    };
  
    // Fetch todos and posts for the user
    function fetchTodosAndPosts(userId) {
      // Reset todos and posts lists
      todosListElement.innerHTML = "";
      postsListElement.innerHTML = "";
  
      // Fetch todos
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        .then(response => response.json())
        .then(todos => {
          todos.forEach(todo => {
            const todoItem = document.createElement("li");
            todoItem.textContent = todo.title;
            todosListElement.appendChild(todoItem);
          });
        });
  
      // Fetch posts
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
          posts.forEach(post => {
            const postItem = document.createElement("li");
            postItem.textContent = post.title;
            postsListElement.appendChild(postItem);
          });
        });
  
      // Show todos by default
      showTodosButton.addEventListener("click", () => {
        document.getElementById("todos").style.display = "block";
        document.getElementById("posts").style.display = "none";
      });
  
      showPostsButton.addEventListener("click", () => {
        document.getElementById("posts").style.display = "block";
        document.getElementById("todos").style.display = "none";
      });
    }

    function sortUsers() {
      usersData.sort((a, b) => {
          return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      });
 
      // Update the current view
      if (usersGridElement.style.display !== "none") {
          displayUsersGrid(usersData);
      } else {
          displayUsersTable(usersData);
      }
    

      // Toggle sorting order for next click
      isAscending = !isAscending;

      // Update button text to indicate sorting order
      sortButton.textContent = isAscending ? "Name ▲" : "Name ▼";
  }

  
  // Add event listener to the sort button
  sortButton.addEventListener("click", sortUsers);
  

  let currentPage = 1; // this will help us keep track of the current page of data
let loading = false; // this will prevent multiple fetches of data at the same time
const contentDiv = document.getElementById('users-grid'); // our post will be dynamically loaded here
const loadingDiv = document.getElementById('loading'); // this will be our target element

const getPosts = async (page) => {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
        if (!response.ok) {
            throw new Error("HTTP error! Status: " + response.status);
        }
        return await response.json();
    } catch (e) {
        throw new Error("Failed to fetch services: " + e.message);
    }
}

const appendData = (data) => {
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'user-card';
        div.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p>
        <button onclick="showUserDetails(${item.id})">View Details</button>`;
        contentDiv.appendChild(div);
    });
}

const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && !loading) {

        console.log(entries)

        loading = true;
        currentPage++;
        try {
            const data = await getPosts(currentPage);
            appendData(data);
        } catch (e) {
            console.log(e.message);
        }
        loading = false;
    }
}, { threshold: 1.0 });

observer.observe(loadingDiv);

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const posts = await getPosts(currentPage);
        if (posts) {
            appendData(posts);
        } else {
            console.log('posts not found or undefined');
        }
    } catch (e) {
        console.log(e.message);
    }
});


let currentTable = 1; // this will help us keep track of the current page of data
let loadingTab = false; // this will prevent multiple fetches of data at the same time
const contentTabDiv = document.getElementById('users-table'); // our post will be dynamically loaded here
const loadingTabDiv = document.getElementById('loading'); // this will be our target element

const getTabPosts = async (page) => {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
        if (!response.ok) {
            throw new Error("HTTP error! Status: " + response.status);
        }
        return await response.json();
    } catch (e) {
        throw new Error("Failed to fetch services: " + e.message);
    }
}

const appendTabData = (data) => {
    data.forEach(item => {
        const div = document.createElement('tr');
        div.innerHTML = `<td>${item.title}</td><td colspan="11">${item.body}</td>
        <td ><button onclick="showUserDetails(${item.id})">View Details</button></td>
        `;
        contentTabDiv.appendChild(div);
    });
}

const observerTab = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && !loadingTab) {

        console.log(entries)

        loadingTab = true;
        currentTable++;
        try {
            const data = await getTabPosts(currentTable);
            appendTabData(data);
        } catch (e) {
            console.log(e.message);
        }
        loadingTab = false;
    }
}, { threshold: 1.0 });

observerTab.observe(loadingTabDiv);

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const posts = await getPosts(currentTable);
        if (posts) {
            appendData(posts);
        } else {
            console.log('posts not found or undefined');
        }
    } catch (e) {
        console.log(e.message);
    }
});


});
  
   