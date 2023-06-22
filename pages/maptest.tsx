import { useSession } from 'next-auth/react'
import React from 'react'

const GetCurrUserMail = () => {
  const { data: session, status } = useSession()
  return session.user.email
}

const maptest = () => {

  return (
    <form action="/api/database/saveMap" method="PUT">
      <input type="hidden" name='owner' value={GetCurrUserMail()} />
  <button type="submit">Save Map Data</button>
</form>
  )
}

export default maptest