import { useEffect, useState } from 'react'
import type { Session } from '@supabase/auth-helpers-react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import type { Database } from '../types/supabase'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user)
        throw new Error('No user')

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single()

      if (error && status !== 406)
        throw error

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    }
    catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error loading user data!')
      // eslint-disable-next-line no-console
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: Profiles['username']
    avatar_url: Profiles['avatar_url']
  }) {
    try {
      setLoading(true)
      if (!user)
        throw new Error('No user')

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)
      if (error)
        throw error
      // eslint-disable-next-line no-alert
      alert('Profile updated!')
    }
    catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error updating the data!')
      // eslint-disable-next-line no-console
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>

      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
