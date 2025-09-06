async function mains(mains) {
    if (mains === "") {
      window.location.replace("/#mains:soundtrack");
    }
    else if (mains === "subs") {
        async function renderSubs() {
            alert("sdk,fj");
        }
    }

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

            if (mains == "todo") {
                mainsTodo();
            }
        })
        .catch(error => {
            // Log any errors to the console
            console.error('There was a problem with the fetch operation:', error);
            mainDiv.innerHTML = '<p style="color: red;">Failed to load content.</p>';
        });
    
    
}