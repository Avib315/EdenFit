# Template Project Documentation

This project serves as a **universal template** for all future web development projects. It provides a solid foundation with reusable components, consistent styling, and best practices.

## 🎯 Project Vision

Create a base template that can be:
- Forked for new projects
- Extended with project-specific components
- Used as a reference for coding standards
- Scaled from small to large applications

---

## 📋 What's Included

### ✅ Core Setup
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite (fast and optimized)
- **Styling**: SCSS with variables and mixins
- **State Management**: Zustand (lightweight alternative to Redux)
- **Routing**: React Router v7
- **Icons**: Lucide React (lightweight icon library)
- **Linting**: ESLint with modern JS standards

### ✅ Component Library
- 7 pre-built, generic components
- Full TypeScript interfaces
- Comprehensive SCSS styling
- Multiple variants for each component
- Responsive design

### ✅ Project Structure
```
src/
├── elements-components/      # Reusable generic components
├── component/               # Specific feature components
├── pages/                   # Page-level components
├── interfaces/              # TypeScript types
├── stores/                  # Zustand state stores
├── styles/                  # Global styles
├── utils/                   # Utility functions
└── assets/                  # Images, translations, configs
```

---

## 🚀 Getting Started

### Step 1: Clone/Fork This Template
```bash
# Clone the template
git clone <repository-url> my-new-project
cd my-new-project

# Optional: Remove git history and start fresh
rm -rf .git
git init
```

### Step 2: Update Project Info
Edit `package.json`:
```json
{
  "name": "my-new-project",
  "description": "My awesome project",
  "version": "0.0.1"
}
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📁 How to Extend

### Adding a New Page
1. Create a folder in `src/pages/MyPage/`
2. Add `MyPage.tsx` and `style.scss`
3. Create a route in your router configuration

**Example:**
```tsx
// src/pages/HomePage/HomePage.tsx
import React from 'react';
import { Button } from '../../elements-components';
import './style.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to My App</h1>
      <Button label="Get Started" onClick={() => {}} />
    </div>
  );
};

export default HomePage;
```

### Adding a New Feature Component
Create in `src/component/FeatureName/`:
```
component/
├── FeatureName/
│   ├── FeatureName.tsx
│   ├── index.ts
│   └── style.scss
```

**Example:**
```tsx
// src/component/UserCard/UserCard.tsx
import React from 'react';
import { Button } from '../../elements-components';
import './style.scss';

interface UserCardProps {
  name: string;
  email: string;
  onEdit: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{email}</p>
      <Button label="Edit" onClick={onEdit} />
    </div>
  );
};

export default UserCard;
```

### Adding Global Store
Create in `src/stores/`:
```tsx
// src/stores/useAuthStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
```

### Using Custom Components
```tsx
import React from 'react';
import { Button, Input, Form } from '../elements-components';
import UserCard from '../component/UserCard';

const MyPage = () => {
  return (
    <div>
      <h1>My Page</h1>
      <Input type="text" placeholder="Search..." />
      <Button label="Search" variant="primary" />
      <UserCard 
        name="John" 
        email="john@example.com" 
        onEdit={() => {}} 
      />
    </div>
  );
};

export default MyPage;
```

---

## 🎨 Styling Guide

### Using the Color Palette
In any SCSS file, import and use colors:

```scss
@import '../../elements-components/style/style.scss';

.my-component {
  background-color: map-get($colors, primary);
  color: map-get($colors, white);
  padding: map-get($sizes, medium);
  border-radius: map-get($border-radius, md);
  box-shadow: map-get($shadows, md);
  transition: $transition-normal;
}
```

### Available Variables
- **Colors**: primary, secondary, tertiary, danger, success, warning, info, white, black, light-gray, dark-gray
- **Sizes**: small (8px), medium (16px), large (24px), xl (32px)
- **Font Sizes**: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px)
- **Border Radius**: none, sm (4px), md (8px), lg (16px), full (9999px)
- **Shadows**: sm, md, lg, xl

### Using Mixins
```scss
.my-flex-container {
  @include flex-center;  // Center items vertically and horizontally
}

.my-responsive {
  @include responsive('mobile') {
    flex-direction: column;
  }
}
```

---

## 📦 Scripts Reference

```bash
# Development
npm run dev              # Start dev server on localhost:5173

# Production
npm run build           # Build optimized production bundle
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Run ESLint to check code

# Combined
npm run build && npm run preview   # Build and preview production
```

---

## 🔌 Integrating External Libraries

### Add a New Package
```bash
npm install package-name
```

### Example: Adding Axios for API Calls
```bash
npm install axios
```

**Usage:**
```tsx
// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

export default api;
```

---

## 🌍 Environment Variables

Create a `.env` file in the root:
```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=MyAwesomeApp
```

Use in your code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📱 Responsive Design

The template includes responsive mixins for common breakpoints:

```scss
@include responsive('mobile') {
  // Styles for screens <= 640px
}

@include responsive('tablet') {
  // Styles for screens <= 1024px
}

@include responsive('desktop') {
  // Styles for screens > 1024px
}
```

---

## 🗂️ Asset Management

### Adding Images
Place images in `src/assets/images/` and import them:

```tsx
import logo from '../../assets/images/logo.png';

<img src={logo} alt="Logo" />
```

### Adding Translations
Update `src/assets/Text/translations.json`:
```json
{
  "en": {
    "welcome": "Welcome",
    "submit": "Submit"
  },
  "es": {
    "welcome": "Bienvenido",
    "submit": "Enviar"
  }
}
```

Use with the translation store:
```tsx
import { useTranslationStore } from '../../stores/useTranslationStore';

const MyComponent = () => {
  const { getText } = useTranslationStore();
  
  return <h1>{getText('welcome')}</h1>;
};
```

---

## 🐛 Debugging

### React DevTools
Install the React DevTools browser extension for easier debugging.

### VSCode Debugging
Add breakpoints and use the built-in debugger or VS Code's debugger.

### Console Logging
```tsx
console.log('Component mounted');
console.error('Error occurred');
```

---

## 🔒 Security Best Practices

1. **Never commit sensitive data** (API keys, tokens)
2. **Use environment variables** for configuration
3. **Validate user input** on both client and server
4. **Keep dependencies updated** - Run `npm audit` regularly
5. **Use HTTPS** in production
6. **Implement proper authentication** with the backend

---

## 📈 Performance Optimization

### Code Splitting
```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

### Memoization
```tsx
import { memo } from 'react';

const MyComponent = memo(({ data }) => {
  return <div>{data}</div>;
});
```

### Image Optimization
Use optimized images in `src/assets/images/` and consider WebP format.

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized `dist/` folder.

### Deploy to Common Platforms

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy
```

**GitHub Pages:**
```bash
npm run build
# Push dist/ to gh-pages branch
```

---

## 📚 Additional Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev)
- [SCSS Guide](https://sass-lang.com/guide)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev)

---

## 🎓 Learning Path

1. **Understand the project structure** - Read this doc and explore `src/`
2. **Review the components** - Check `src/elements-components/`
3. **Create a simple page** - Add your first page to understand the flow
4. **Add a feature component** - Create a custom component in `src/component/`
5. **Manage state** - Create a Zustand store for global state
6. **Style your components** - Use the SCSS variables and mixins

---

## ✨ Tips & Tricks

- **Hot Module Replacement (HMR)**: Changes are reflected instantly in browser
- **TypeScript IntelliSense**: Hover over components for automatic documentation
- **Component Reusability**: Always try to make components generic
- **Naming Conventions**: Use PascalCase for components, camelCase for functions
- **Barrel Exports**: Use `index.ts` files for cleaner imports

---

## 🤝 Contributing to This Template

If you improve this template, consider:
1. Documenting changes
2. Testing thoroughly
3. Keeping components generic
4. Updating this guide

---

## 📞 Need Help?

- Check the component docs in `COMPONENTS_README.md`
- Review existing components for patterns
- Search TypeScript errors online
- Check React DevTools for component issues

---

**Happy coding! 🚀**
