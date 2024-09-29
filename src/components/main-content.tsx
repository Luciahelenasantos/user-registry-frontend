import React from 'react'

interface MainContentProps {
  children: React.ReactNode
  className?: string
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex flex-1 flex-col p-6 ${className || ''}`}>
      {children}
    </div>
  )
}

export default MainContent
