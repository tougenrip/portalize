import { useSession } from 'next-auth/react'
import React from 'react'


const maptest = () => {

  return (
    <form action="/api/database/saveMap?function=uploadMap" method="POST">
  <button type="submit">Save Map Data</button>
</form>
  )
}

export default maptest