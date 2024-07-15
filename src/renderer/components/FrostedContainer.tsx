export default function FrostedContainer({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={`${className} p-4 w-2/3 rounded-lg bg-opacity-50 bg-white backdrop-blur-md border-solid border-white border-opacity-50 border-2 `}
    >
      {children}
    </div>
  );
}
