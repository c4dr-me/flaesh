# Flashcard Roadmap SaaS Application

Welcome to the **[Flash](https://flaesh.vercel.app/)**, a comprehensive tool for learning and planning success! This application combines interactive flashcards with visually appealing roadmaps to help users master new topics and stay organized. Whether you're a student, professional, or lifelong learner, this app is designed to enhance your knowledge retention and streamline your learning journey.

**Link**: [https://flaesh.vercel.app/](https://flaesh.vercel.app/)

## **Key Features**

### Design

- **Dark Theme:** A sleek, modern dark theme for reduced eye strain and enhanced visual appeal.
- **Animation:** Simple and smooth animations
- **Responsive Layout:** Fully responsive design that looks great on any device.
  ![Homepage]([https://github.com/user-attachments/assets/66b29c2c-6036-4c3e-824f-6ae604fa59fa](https://github-production-user-asset-6210df.s3.amazonaws.com/142721314/392571184-cbe9fd06-aba3-4f60-b358-3cafd3197dcf.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241204%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241204T212533Z&X-Amz-Expires=300&X-Amz-Signature=2bf66ab2bb7e808f9bd18bc95e4f3642a695178fc266a76014583483ff68e38e&X-Amz-SignedHeaders=host))
  





### Flashcards

- **Create and Manage Flashcards:** Effortlessly create, edit, and delete flashcards for different topics.
- **Organized Study:** Flashcards are categorized into topics, making it easy to focus on specific areas.
- **Cached Data:** Previously viewed flashcards are cached for instant access.
- **Loading Skeleton:** For better User Experience
  ![Flashcards](./public/flashcard.png)

### Roadmaps

- **Interactive Roadmaps:** Visualize your learning path with interactive and editable roadmaps.
- **Topic Focus:** Dive deep into specific topics by selecting a roadmap.
- **Description:** Get timeline, brief description and instant flashcards for roadmap topics
- **Cached Roadmap Data:** Quickly revisit previously explored roadmaps without additional loading.
  ![Roadmaps](https://github.com/user-attachments/assets/cbe9fd06-aba3-4f60-b358-3cafd3197dcf)

### User-friendly Sidebar

- **Dynamic Sidebar:** View your saved flashcards and roadmaps in a collapsible sidebar.
- **Quick Access:** Easily navigate between topics with the intuitive interface.
- **Skeleton Loader:** Skeleton loader for better UX
  ![Dashboard Skeleton](./public/dashboardwithskeleton.png)
- **Responsive Design:** The sidebar adjusts dynamically for desktop and mobile users.
  ![Dashboard](./public/dashboard.png)
  
### Backend Efficiency

- **API-Driven Architecture:** Leverages a robust backend API to fetch, edit, and delete flashcards and roadmaps.
- **Error Handling:** Ensures consistent performance and helpful error messages.
- **Toast messaged:** Ensures Better UX
  ![CRUD](./public/image.png)

## **Tech Stack**

### Frontend

- **React.js**: A modern JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **ShadCN**: A design system with components built using Tailwind CSS to make the UI development faster.
- **Framer Motion**: A motion library for React that provides animations and transitions to enhance the user experience.
- **React Flow**: Used to generate binary tree roadmaps

### Backend

- **Node.js**: A JavaScript runtime for building scalable backend services.
- **REST APIs**: Backend endpoints to manage flashcards and roadmaps.
- **Supabase**: An open-source backend-as-a-service platform that provides a suite of tools such as authentication, database, and storage, similar to Firebase.
- **Prisma**: An ORM (Object Relational Mapping) tool for working with PostgreSQL, allowing you to easily interact with your database in a type-safe manner.
- **PostgreSQL**: A powerful, open-source relational database used for managing user data and content.
- **NGINX**: A web server used to serve static files, reverse proxy, and load balance the application in a production environment.
- **Webhook Testing**: Use NGINX in the development environment for webhook testing, ensuring reliable endpoint communications.

### Database

- **Supabase/PostgreSQL**: Managed PostgreSQL database service offered by Supabase, used to store and manage application data. Initially use postgres locally.

### Authentication

- **Clerk**: Simple, powerful authentication service for handling user sessions, sign-ups, logins, and security.
- **WebHooks**: Synchronized database with clerk webhook

### Dev Tools

- **NGINX (Local Development)**: For testing webhooks and API integrations locally.
- **Postman**: For API testing and testing webhook integrations.
- **Vercel**: For deploying the frontend and backend of the application with ease.

## **Getting Started**

Follow these steps to get the app running on your local machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js**:
- **Postgres**:
- **npm or yarn**:
- **nginx**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/c4dr-me/Flaesh.git
   cd flaesh
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and `.env` for prisma and add:

   ```env
    DATABASE_URL=
    DIRECT_URL= (needed for supabase if testing locally with postgres then not needed)
    NEXTAUTH_URL=


    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    CLERK_FRONTEND_API=
    SIGNING_SECRET=

    GROQ_API_KEY=
   ```

4. **Run the app:**

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

6. While deploying make sure to add the build script on Vercel as `npx prisma generate && next build`.

## **Contributing**

We welcome contributions to improve this app! To contribute:

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes (`git commit -m "Add a new feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## **Future Enhancements**

### Planned Features:

- **Quiz App:** Short quiz based on the flashcard/roadmap.
- **Export Options:** Export roadmaps and flashcards to PDF or Excel.

## **License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## **Contact**

- Contact at **jayant_cse_26@msit.in**.
