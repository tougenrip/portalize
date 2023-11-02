import { GetServerSideProps } from 'next'
import React from 'react'




export const getServerSideProps = async(req) => {
  const {id:uid} = req.query
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/user/${uid}`)
  const user = await res.json()
  return { props: { user } }
}

const ProfilePage = ({user}) => {
  return (
    <div>this is the page of the user with id {user.id}</div>
  )
}

export default ProfilePage