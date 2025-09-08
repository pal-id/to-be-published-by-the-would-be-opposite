async function mainsSubs() {
    const container = document.getElementById("mains");

  try {
    // Fetch the JSON file
    const response = await fetch("/assets/data/extract-linkedin.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const subs = await response.json();
    

    let table = "<table border='0'>\n";
    table += "<tr><td><b>name:</b></td><td><b>domain(s):<b></td></tr>\n";
    subs.forEach(item => {
        console.log(item);
        let row = "\t<tr>" +
            
            "<td><a href='"+item.url+"'>" + item.name + "</a></td>" + 
            "<td><a href='https://"+item.domain+"'>" + item.domain + "</td>" +
        "</tr>\n";
        table += row;
    });

    table += "</table>";
    
    container.innerHTML = table;


    
  } catch (error) {
    // Handle any errors during the fetch or parsing
    
    container.innerText = 'Error loading data.';
  }
}

async function mains(mains) {
    // The path to the HTML file you want to load
    const filePath = "/mains/" + mains + ".html"

    console.log(filePath);
    // Get a reference to the 'mains' div
    const mainDiv = document.getElementById('mains');

    // Use the fetch API to get the HTML file content
    fetch(filePath)
        .then(response => {
            // Check if the response was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Convert the response to plain text
            return response.text();
        })
        .then(html => {
            // Insert the HTML content into the 'mains' div
            mainDiv.innerHTML = html;

            if (mains == "todo") loadMarkdown("/TODO.md", "todoData");
            else if (mains == "instructions") loadMarkdown("/README.md", "instructionsData");
            else if (mains == "subs") mainsSubs();
        })
        .catch(error => {
            // Log any errors to the console
            console.error('There was a problem with the fetch operation:', error);
            mainDiv.innerHTML = '<p style="color: red;">Failed to load content.</p>';
        });   
}