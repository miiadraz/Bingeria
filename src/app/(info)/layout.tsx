export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-2xl p-8">{children}</div>;
}
