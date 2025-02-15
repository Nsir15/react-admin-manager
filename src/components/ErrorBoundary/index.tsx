import React, { PropsWithChildren, ReactNode } from "react"

interface IErrorBoundary {
  fallbackComponent?: ReactNode
}

class ErrorBoundary extends React.Component<PropsWithChildren<IErrorBoundary>> {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 可以做错误日志记录
    console.error("Error caught in ErrorBoundary: ", error, errorInfo)
  }

  render(): React.ReactNode {
    if (this.state.hasError) return this.props.fallbackComponent || <h1>出错了！</h1>
    return this.props.children
  }
}

export default ErrorBoundary
