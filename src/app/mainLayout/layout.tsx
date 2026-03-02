import StaticImage from "@/component/images/page";
import NavBar from "@/component/NavBar/page";
export const metadata: Metadata = {
  title: "Devlink main layout",
  description: "Devlink limited plc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    < NavBar />

    <main className="">
      <div className="flex flex-col lg:flex-row items-start gap-6 max-w-6xl mx-auto">
        <StaticImage />
        {children}
      </div>
    </main>

    </>


       
  );
}
