import HeaderAntd from "@/components/HeaderAntd/HeaderAntd";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderAntd>{children}</HeaderAntd>
    </div>
  );
}
