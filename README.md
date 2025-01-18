# Cognitive AI is a web-based AI chat application powered by Groq API and utilizing Llama3-8b-8192. Built with React, Vite, and Tailwind CSS, it delivers a modern, interactive chat experience. 

Follow the instructions below to set up the project locally.

## Features
- Interactive AI chat interface
- Built with modern tools: React, Vite, and Tailwind CSS
- Easily customizable and extendable

## Tech Stack
- **React**: JavaScript library for building user interfaces
- **Vite**: Lightning-fast development environment
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## Prerequisites
- Node.js and npm installed on your machine
- A [Groq](https://www.groq.com) account to obtain an API key for cloning and running the application

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   Run the following command to install the required Node modules:
   ```bash
   npm install
   ```

3. **Set Up API Key**
   - Sign up or log in to your [Groq](https://www.groq.com) account.
   - Obtain your API key.
   - Create a `.env` file in the project root and add your API key:
     ```env
     VITE_API_KEY=<your-groq-api-key>
     ```

4. **Run the Development Server**
   Start the application in development mode:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` by default.

## Deployment
To deploy the application, build the production-ready files:
```bash
npm run build
```
The output files will be located in the `dist` directory. Deploy these files to your preferred hosting provider.

## Contributing
Feel free to fork this repository and submit pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments
Special thanks to the developers and community behind React, Vite, Tailwind CSS, and Groq for providing the tools and inspiration to create this project.
