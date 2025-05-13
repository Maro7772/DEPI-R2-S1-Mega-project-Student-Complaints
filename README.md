# [depi-r2-s1-mega-project-student-complaints-maro7772s-projects.vercel.app](https://depi-r2-s1-mega-project-student-complaints-maro7772s-projects.vercel.app/)


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
```mermaid
erDiagram
    USER {
        ObjectId _id PK
        string fullName
        string email
        string phoneNumber
        string passwordHash
        Role role
        int enrollmentYear
        string department
        Date createdAt
        Date updatedAt
    }
    COMPLAINT {
        ObjectId _id PK
        ObjectId student FK
        Category category
        string description
        Status status
        Date submissionDate
        Date resolutionDate
        Date createdAt
        Date updatedAt
    }
    RECOMMENDATION {
        ObjectId _id PK
        ObjectId complaint FK
        Category suggestedCategory
        string suggestedSolution
        float confidenceScore
        Date createdAt
        Date updatedAt
    }
    ATTACHMENT {
        ObjectId _id PK
        ObjectId complaint FK
        string fileUrl
        Date uploadedAt
    }
    FEEDBACK {
        ObjectId _id PK
        ObjectId complaint FK
        int rating
        string comments
        Date createdAt
        Date updatedAt
    }
    ESCALATION {
        ObjectId _id PK
        ObjectId complaint FK
        ObjectId escalatedTo FK
        string escalationReason
        Date escalationDate
    }
    NOTIFICATION {
        ObjectId _id PK
        ObjectId user FK
        string message
        Date sentAt
    }
    REPORT {
        ObjectId _id PK
        ObjectId admin FK
        Date generatedOn
        ReportType reportType
        JSON data
    }

    USER ||--o{ COMPLAINT       : submits
    COMPLAINT ||--o{ ATTACHMENT   : has
    COMPLAINT ||--o{ RECOMMENDATION: generates
    COMPLAINT ||--o{ FEEDBACK     : receives
    COMPLAINT ||--o{ ESCALATION   : undergoes
    USER ||--o{ NOTIFICATION     : receives
    USER ||--o{ REPORT           : generates
  ```
