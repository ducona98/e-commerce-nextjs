export const metadata = {
  title: "Sign In",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
}
