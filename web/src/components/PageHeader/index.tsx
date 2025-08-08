
interface PageHeaderProps {
  title: string,
  subtitle?: string,
  children?: React.ReactNode
}

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="mb-5">
      <h1 className="text-3xl font-bold mb-3 text-gray-900">{title}</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{subtitle}</h2>
        {children}
      </div>
    </div>
  )
}