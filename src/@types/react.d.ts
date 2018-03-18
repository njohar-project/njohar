import 'react'
// Augmentation of React
declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: 'true'
    global?: boolean
  }
}
