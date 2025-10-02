# Dipak Rathod's Tech Blog

A modern, responsive blog site built with Next.js 15, Nextra, and TailwindCSS, featuring articles on Cloud computing, DevOps practices, and modern development patterns.

![Blog Preview](public/profile.jpg)

## 🚀 Features

### Core Features

- **Modern Tech Stack**: Next.js 15 with Turbopack, TypeScript, and TailwindCSS
- **Blog Platform**: Powered by Nextra Blog theme with MDX support
- **Responsive Design**: Mobile-first design with beautiful UI components
- **Search Functionality**: Built-in search with Pagefind integration
- **Dark/Light Theme**: Automatic theme switching with next-themes
- **Comments System**: Integrated Giscus for GitHub-based comments
- **SEO Optimized**: Comprehensive meta tags and OpenGraph support

### Content Features

- **Blog Posts**: Technical articles on AWS, Docker, Kubernetes, and more
- **Tag-based Organization**: Posts categorized by technology and topics
- **Reading Time**: Automatic calculation of estimated reading time
- **Featured Posts**: Curated selection of important articles
- **RSS Feed**: Automatically generated RSS feed for subscribers

### UI/UX Features

- **Custom Navigation**: Enhanced navbar with active state detection
- **Hero Section**: Interactive hero with orbiting technology icons
- **Author Profile**: Integrated author information and social links
- **Animated Components**: Smooth animations and transitions
- **Avatar Circles**: Social proof elements throughout the site

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Build Tool**: [Turbopack](https://turbo.build/pack) for ultra-fast development
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/) with custom components
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)

### Blog Engine

- **Content**: [Nextra](https://nextra.site/) with Blog theme
- **Writing**: MDX for rich content with React components
- **Search**: [Pagefind](https://pagefind.app/) for static site search
- **Comments**: [Giscus](https://giscus.app/) for GitHub-based discussions

### Development

- **Language**: TypeScript for type safety
- **Package Manager**: pnpm for efficient dependency management
- **Linting**: ESLint with Next.js configuration
- **Theme**: Custom theme provider with system preference detection

## 📁 Project Structure

```
blog-site/
├── src/
│   ├── app/
│   │   ├── (blog)/                 # Blog route group
│   │   │   ├── posts/              # Blog posts
│   │   │   │   ├── aws-lambda-best-practices/
│   │   │   │   ├── docker-containerization/
│   │   │   │   ├── kubernetes-deployment-strategies/
│   │   │   │   └── nextjs-turbopack/
│   │   │   ├── tags/[tag]/         # Dynamic tag pages
│   │   │   └── rss.xml/            # RSS feed generation
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Homepage
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   ├── BlogHero.tsx            # Hero section component
│   │   ├── FeaturedBlogs.tsx       # Featured posts component
│   │   ├── CustomNavbar.tsx        # Enhanced navigation
│   │   └── component-index.tsx     # Component exports
│   ├── data/
│   │   ├── author.ts               # Author information
│   │   └── giscus.ts               # Comments configuration
│   ├── lib/
│   │   ├── get-posts.js            # Post fetching utilities
│   │   ├── read-time.js            # Reading time calculation
│   │   └── utils.ts                # Common utilities
│   └── types/                      # TypeScript type definitions
├── public/                         # Static assets
├── components.json                 # Shadcn/ui configuration
└── next.config.ts                  # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dipakrathod-tech/blog-site.git
   cd blog-site
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Development Commands

```bash
# Development with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Generate search index (runs after build)
pnpm postbuild
```

## 📝 Content Management

### Adding New Posts

1. **Create post directory**

   ```bash
   mkdir src/app/(blog)/posts/your-post-name
   ```

2. **Add MDX file**

   ```bash
   touch src/app/(blog)/posts/your-post-name/page.mdx
   ```

3. **Add frontmatter**

   ```mdx
   ---
   title: Your Post Title
   date: 2025-01-15
   tags: ["Tag1", "Tag2", "Tag3"]
   description: Brief description of your post
   ---

   # Your Post Title

   Your content here...
   ```

### Content Categories

Posts are automatically categorized based on tags:

- **AWS**: AWS services, Lambda, S3, CloudFormation
- **DevOps**: Docker, Kubernetes, CI/CD, Jenkins, Terraform
- **Development**: JavaScript, TypeScript, React, Next.js, Python
- **Challenge**: Tutorials, guides, learning resources

### Supported Technologies

The blog covers various technologies represented in the hero section:

- ☁️ Cloud Computing (AWS)
- 🐳 Containerization (Docker)
- ⚙️ Orchestration (Kubernetes)
- 🏗️ Infrastructure (Terraform)
- 🔄 CI/CD (Jenkins)
- 💻 Programming (JavaScript, Python, Java)

## 🎨 Customization

### Theme Configuration

The site supports automatic dark/light theme switching. Customize in `src/components/ui/ThemeProvider.tsx`:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
```

### Author Information

Update author details in `src/data/author.ts`:

```typescript
const author = {
  name: "Your Name",
  role: "Your Role",
  avatar: "/your-avatar.jpg",
  profileUrl: "https://yourwebsite.com",
  socials: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
};
```

### UI Components

The site uses a custom component library built on Radix UI:

- `Card` components for post previews
- `Badge` components for tags
- `Button` components with variants
- `Tabs` for content organization
- `Avatar` components for author display

## 🔧 Configuration Files

- `next.config.ts` - Next.js and Nextra configuration
- `tailwind.config.js` - TailwindCSS configuration
- `components.json` - Shadcn/ui component configuration
- `eslint.config.mjs` - ESLint configuration
- `tsconfig.json` - TypeScript configuration

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:

- Collapsible navigation
- Adaptive grid layouts
- Responsive typography
- Touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Set build command**: `pnpm build`
3. **Set output directory**: `.next`
4. **Deploy automatically** on push to main

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Dipak Rathod**

- Website: [dipakrathod.me](https://dipakrathod.me)
- Twitter: [@dipakrathod-tech](https://twitter.com/dipakrathod-tech)
- GitHub: [@dipakrathod-tech](https://github.com/dipakrathod-tech)
- LinkedIn: [dipakrathod-tech](https://linkedin.com/in/dipakrathod-tech)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Nextra](https://nextra.site/) for the blog theme
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Vercel](https://vercel.com/) for hosting platform

---

⭐ **Star this repository** if you find it helpful!

🐛 **Found a bug?** [Open an issue](https://github.com/dipakrathod-tech/blog-site/issues)

💡 **Have a suggestion?** [Start a discussion](https://github.com/dipakrathod-tech/blog-site/discussions)
