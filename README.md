# Bitlads Software

A modern, responsive website showcasing intelligent workflow automation solutions built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Interactive Workflow Demos** - Step-by-step automation demonstrations
- **Multi-language Support** - English and Romanian translations
- **Responsive Design** - Optimized for all devices
- **Contact Form** - Integrated with SparkPost email service
- **SEO Optimized** - Comprehensive meta tags and structured data
- **Performance Optimized** - Code splitting and asset optimization
- **Accessibility** - WCAG compliant design
- **Dark Mode Support** - Theme-aware components

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Radix UI components
- **Icons**: Lucide React
- **Email**: SparkPost API via Netlify Functions
- **Deployment**: Netlify with automatic deployments

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bitlads-software-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Start the development server:
```bash
npm run dev
```

## 🌐 Deployment

### Netlify Deployment

1. **Connect Repository**: Link your GitHub repository to Netlify

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Environment Variables**:
   Set the following in Netlify dashboard:
   ```
   REACT_APP_SPARKPOST=your_sparkpost_api_key
   ```

4. **Deploy**: Netlify will automatically deploy on every push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting provider
```

## 📧 Email Configuration

The contact form uses SparkPost for email delivery via Netlify Functions.

1. **Get SparkPost API Key**:
   - Sign up at [SparkPost](https://www.sparkpost.com/)
   - Create an API key with transmission permissions
   - Verify your sending domain

2. **Configure Environment**:
   ```bash
   REACT_APP_SPARKPOST=your_api_key_here
   ```

3. **Update Email Settings**:
   Edit `functions/send-email.js` to customize:
   - Sender email address
   - Recipient email address
   - Email template

## 🎨 Customization

### Colors
The site uses a custom color palette defined in `src/index.css`:
- **Primary**: Jonquil (#ffd100)
- **Secondary**: Aureolin (#ffee32)
- **Neutral**: Timberwolf (#d6d6d6)
- **Dark**: Eerie Black (#202020)

### Content
- **Translations**: Edit `src/contexts/LanguageContext.tsx`
- **Workflows**: Modify workflow data in `src/pages/HomePage.tsx`
- **SEO**: Update meta tags in `src/components/SEOHead.tsx`

### Styling
- **Components**: Styled with Tailwind CSS classes
- **Themes**: Dark/light mode support built-in
- **Responsive**: Mobile-first design approach

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── ContactForm.tsx # Contact form with validation
│   ├── WorkflowDemo.tsx # Interactive workflow demonstrations
│   └── ...
├── contexts/           # React contexts (language, theme)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── lib/                # Utility functions
└── index.css          # Global styles and Tailwind config

functions/              # Netlify serverless functions
├── send-email.js      # Contact form email handler
└── package.json       # Function dependencies

public/                 # Static assets
├── robots.txt         # SEO robots file
├── sitemap.xml        # SEO sitemap
└── site.webmanifest   # PWA manifest
```

## 🚀 Performance

The site is optimized for performance with:

- **Code Splitting**: Automatic chunk splitting for faster loading
- **Asset Optimization**: Minified CSS/JS, optimized images
- **Caching**: Long-term caching for static assets
- **Lazy Loading**: Components loaded on demand
- **Tree Shaking**: Unused code elimination

## 🔒 Security

Security features include:

- **CSP Headers**: Content Security Policy protection
- **HTTPS Only**: Secure connections enforced
- **Input Validation**: Form validation and sanitization
- **Rate Limiting**: API endpoint protection
- **Secure Headers**: XSS, clickjacking protection

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- **Email**: hello@bitladssoftware.com
- **Documentation**: Check this README and code comments
- **Issues**: Create a GitHub issue for bugs or feature requests

## 🔄 Updates

The site is regularly updated with:

- **Security patches**: Dependencies kept up-to-date
- **Performance improvements**: Ongoing optimization
- **Feature enhancements**: Based on user feedback
- **Content updates**: Fresh examples and use cases

---

Built with ❤️ using modern web technologies for optimal performance and user experience.