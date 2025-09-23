import { Box } from "@mantine/core"
import HeroSection from "@/components/HeroSection"
import ParcoursProfessionnel from "@/components/ParcoursProfessionnel"
import ServicesSection from "@/components/ServicesSection"
import Footer from "@/components/Footer"

export default function Contact() {
    return (
        <Box style={{ minHeight: "100vh", backgroundColor: "var(--mantine-color-gray-0)" }}>
            <HeroSection />
            {/* <ParcoursProfessionnel /> */}
            <ServicesSection />
            <Footer />
        </Box>
    )
}
