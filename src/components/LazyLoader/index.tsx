import React, { Suspense } from "react"
import ErrorBoundary from "../ErrorBoundary"
import { Spin } from "antd"

const LazyLoader = (Component: React.LazyExoticComponent<(props?: any) => React.ReactNode>): React.ReactNode => {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Spin
            size='large'
            style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}
          />
        }
      >
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}

export default LazyLoader
