# N-Total Cybersecurity Launchpad

## 🚀 Professional Cybersecurity Platform

**N-Total Cybersecurity LLC** delivers innovative, AI-enabled solutions that address today's complex security challenges and prepare organizations for tomorrow's threats.

## 🌟 Features

- **AI-Enabled GRC**: Governance, Risk & Compliance with intelligent automation
- **Threat Intelligence**: Real-time cybersecurity threat monitoring and alerts
- **Training & Advisory**: Comprehensive cybersecurity education and consulting
- **OT Security**: Operational Technology security solutions
- **Interactive Chatbot**: AI-powered cybersecurity assistance
- **Responsive Design**: Optimized for all devices and screen sizes

## 🛠️ Technologies

This project is built with modern, enterprise-grade technologies:

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: shadcn/ui with Tailwind CSS
- **Styling**: Tailwind CSS with custom cybersecurity theme
- **State Management**: React Hooks and Context API
- **Deployment**: AWS Amplify ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git for version control

### Local Development

```sh
# Step 1: Clone the repository
git clone https://github.com/GovComSolutions/N-Total.git

# Step 2: Navigate to the project directory
cd ntotal-cybersec-launchpad-main

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```sh
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### AWS Amplify Deployment

This application is configured for AWS Amplify deployment:

1. **Automatic Detection**: AWS Amplify will auto-detect the `amplify.yml` configuration
2. **Build Process**: Uses `npm run build` to create production-ready files
3. **Artifacts**: Serves files from the `dist/` directory
4. **Caching**: Optimized caching for faster builds

See `AWS_AMPLIFY_DEPLOYMENT.md` for detailed deployment instructions.

### Manual Deployment

You can also deploy to any static hosting service:

- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Enable GitHub Pages in repository settings
- **AWS S3**: Upload `dist/` contents to an S3 bucket

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ThreatIntelligence/  # Threat monitoring components
├── pages/              # Main application pages
├── hooks/              # Custom React hooks
├── services/           # API and external service integrations
├── types/              # TypeScript type definitions
└── assets/             # Images and static assets
```

## 🎨 Customization

### Theme Configuration

The application includes a sophisticated cybersecurity theme with:

- **Color Palette**: Professional cyber-blue color scheme
- **Animations**: Smooth transitions and hover effects
- **Typography**: Modern, readable fonts
- **Responsive Design**: Mobile-first approach

### Component Customization

All components are built with shadcn/ui and can be easily customized:

- Modify `tailwind.config.ts` for theme changes
- Update component variants in individual component files
- Add new components following the established patterns

## 🔧 Development Scripts

```json
{
  "dev": "Start development server",
  "build": "Build for production",
  "preview": "Preview production build",
  "lint": "Run ESLint",
  "type-check": "Run TypeScript compiler",
  "test": "Run unit tests"
}
```

## 📊 Performance

- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: Fast initial page load
- **SEO**: Optimized for search engines
- **Accessibility**: WCAG compliant components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by N-Total Cybersecurity LLC.

## 🆘 Support

For support and questions:

- **Email**: info@ntotal-cyber.com
- **LinkedIn**: Connect with our team
- **Documentation**: See `AWS_AMPLIFY_DEPLOYMENT.md` for deployment help

## 🎯 Roadmap

- [ ] Enhanced threat intelligence feeds
- [ ] Advanced AI chatbot capabilities
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with security tools
- [ ] Mobile application

---

**Built with ❤️ by N-Total Cybersecurity LLC**
