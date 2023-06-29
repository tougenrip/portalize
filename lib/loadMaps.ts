export async function loadMaps() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://localhost:3000/api/user/getMaps')
    const data = await res.json()
   
    return data
  }