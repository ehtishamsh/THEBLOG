# The Blog

This is a blog project built with Next.js, Prisma, NextAuth, Shadcn UI, Supabase, PostgreSQL, and more. The project allows users to view, edit, and create blogs, add tags using the Tiptap editor and uploadthings for managing images, and provides authentication features. The dashboard for both admin and user is designed using Shadcn DataTables.

## Live Demo
[Click on this Live Link](https://theblogs-ecru.vercel.app/)
## Technologies Used

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth](https://next-auth.js.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tiptap Editor](https://tiptap.dev/)


## Features

- View blogs
- Edit user-owned blogs
- Add tags to blogs using Tiptap Editor
- User login and registration
- Dashboard for both admin and user
- Responsive design with Shadcn DataTables

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/nextjs-blog.git
   cd nextjs-blog
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of your project and add the necessary variables:

   ```env
 DATABASE_URL= ""
NEXTAUTH_SECRET= ""
UPLOADTHING_SECRET= ""
NEXTAUTH_URL=""
SMTP_PASS=""
SMTP_EMAIL=""
   # Add other necessary environment variables for NextAuth, etc.
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to adjust the content to better suit your project structure and details.
