import ButtonGradient from "../components/ButtonGradient";
import GridContainer from "../components/defaults/GridContainer";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import NavBar from "../components/nav/NavBar";
import SideBar from "../components/nav/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen h-full background">
      <ButtonGradient/>
        <GridContainer cols={12}>
            <SideBar />
            <MaxWidthWrapper className="lg:col-span-10 col-span-12">
                <NavBar/>
                {children}
            </MaxWidthWrapper>
        </GridContainer>
    </main>
  );
}
