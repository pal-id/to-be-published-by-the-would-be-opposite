async function displayRandoName() {
  const container = document.getElementById('personOfTheVoid');

  try {
    // Fetch the JSON file
    const response = await fetch("/assets/data/names.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const names = await response.json();

    // Check if the fetched data is a non-empty array
    if (Array.isArray(names) && names.length > 0) {
      // Get a random index
      const randomIndex = Math.floor(Math.random() * names.length);
      
      // Get the random name from the array
      const randomName = names[randomIndex];

      // Set the inner text of the div
      container.innerHTML = randomName;
    } else {
      container.innerText = "No names available.";
    }
  } catch (error) {
    // Handle any errors during the fetch or parsing
    console.error('Could not fetch the names:', error);
    container.innerText = 'Error loading data.';
  }
}