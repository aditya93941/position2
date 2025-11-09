import StudioxHeader from '@/components/studioxHeader/page';
import StudioxBanner from '@/components/studioxBanner/page';
import StudioxCarousal from '@/components/studioxCarousal/page';
import StudioxBattleTested from '@/components/studioxBattleTested/page';
import StudioxGotALaunch from '@/components/studioxGotALaunch/page';
import StudioxFooter from '@/components/studoxFooter/page'
import Studiox3D from '@/components/studiox3D/page';
import StudioxFeatures from '@/components/studioxFeatures/page';
import Footer from '@/components/footer/page';

export const page = () => {
    return (
        <>
            <StudioxHeader/>
            <StudioxBanner />
            <Studiox3D />
            <StudioxCarousal />
            <StudioxFeatures />
            <StudioxBattleTested />
            <StudioxGotALaunch />
            <StudioxFooter />
            <Footer />

        </>
    )
}


export default page;
