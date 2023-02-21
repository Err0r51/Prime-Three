import React from 'react'

export default function FirstPost() {
  return (
    <div>
       <h1>Navbar</h1>
       <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </div>

  )
}
