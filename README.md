# DeCleanup dApp

A decentralized application for environmental cleanup initiatives built with Next.js, TypeScript, and Web3 technologies.

## 🚀 Features

- **Web3 Integration**: Seamless blockchain interactions
- **Modern UI**: Built with Tailwind CSS and shadcn/ui
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Mobile-first approach
- **Authentication**: Secure user authentication
- **Real-time Updates**: Live data synchronization

## 📁 Project Structure

This project follows a professional, scalable architecture:

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components (organized by feature)
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Utilities, constants, and helpers
├── services/         # API and Web3 service functions
├── styles/           # Global styles and CSS
└── types/            # TypeScript type definitions
```

For detailed structure documentation, see [STRUCTURE.md](./STRUCTURE.md).

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Web3**: Ethers.js, Wagmi, RainbowKit
- **Authentication**: NextAuth.js
- **State Management**: React Context + TanStack Query
- **Package Manager**: npm/yarn/bun

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or bun
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_DECLEANUP_CONTRACT_ADDRESS=your_contract_address
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🏗️ Architecture

### Component Organization

Components are organized by functionality:

- **`/components/layout/`** - Layout components (Header, Footer)
- **`/components/forms/`** - Form components (Login, Registration)
- **`/components/features/`** - Feature-specific components
- **`/components/common/`** - Reusable common components
- **`/components/ui/`** - Base UI components (shadcn/ui)

### Service Layer

- **`/services/api/`** - REST API service functions
- **`/services/web3/`** - Blockchain interaction services

### Utility Functions

- **`/lib/utils/`** - Reusable utility functions
- **`/lib/constants/`** - Application constants
- **`/lib/validators/`** - Validation functions

## 🔧 Configuration

### TypeScript

The project uses strict TypeScript configuration with:

- Path aliases for clean imports
- Strict type checking
- Modern ES features

### ESLint & Prettier

- Airbnb TypeScript ESLint configuration
- Prettier for code formatting
- Husky for pre-commit hooks

### Tailwind CSS

- Custom design system
- Responsive breakpoints
- Dark mode support

## 🌐 Web3 Integration

### Supported Networks

- Ethereum Mainnet
- Polygon
- Arbitrum One
- Test networks (Goerli, Mumbai)

### Contract Integration

- DeCleanup smart contracts
- Wallet connection (RainbowKit)
- Transaction management

## 📱 Responsive Design

The application is built with a mobile-first approach and supports:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](./STRUCTURE.md)
2. Search existing [issues](../../issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Ethers.js](https://ethers.org/) - Ethereum library
- [RainbowKit](https://rainbowkit.com/) - Wallet connection

---

Built with ❤️ for a cleaner future
