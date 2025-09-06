async function linkedinExtractor(url) {
    console.log(url);
    const response = await fetch(url);

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    console.log("KAKAKAAA");
    console.log(doc.getElementById("ember34"));
    console.log("KAKAKAAA");
}