import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'

export default function Overview() {
  // const [loading, setLoading] = useState<boolean>(true)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    void fetchProfile()
  }, [])

  async function fetchProfile() {
    const session = await supabase.auth.getUser()
    if (!session.data.user)
      void router.push('/sign-in')
    else
      setProfile(session)
  }

  if (!profile)
    return null

  return (
    <div>
      <h1>Overview</h1>
      <p>Name: {profile.data.user.email}</p>
      <p>USER ID: {profile.data.user.id}</p>
    </div>
  )
}
