interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY: string
  readonly VITE_RECAPTCHA_KEY: string
  // Add any other custom environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}