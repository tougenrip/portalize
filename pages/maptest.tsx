import { useSession } from 'next-auth/react'
import React from 'react'


const maptest = () => {

  return (
    <form action="/api/database/saveMap" method="PUT">
  <button type="submit">Save Map Data</button>
</form>
  )
}

export default maptest