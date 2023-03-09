# Prime Three - a Washing matching webtool

This tool enables flatmates to findwashing partners to utilize the washing mashine efficient (and cost efective) \
The tech stack is Next.js (with TypeScript) and a Supabase backend.

## Getting Started

### Prerequisites

- Node.js
- Supabase access

### Installation

1. Clone the repository
2. Install dependencies:
3. Create a .env.local file in the root directory and add the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://the-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=the-supabase-anon-key
```

## Development
This project uses a git feature branch workflow with [GACP](https://github.com/vivaxy/gacp) (Git Add Commit Push) as the commit message format. 

### Workflow
1. Create a new feature branch from the develop branch.

2. Make changes and commits to the feature branch.

3. Push the feature branch to the remote repository.

4. Once the feature is complete, create a pull request to merge the feature branch into the develop branch.




## Deployment
This project is automatically deployed to Vercel on every push to the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.