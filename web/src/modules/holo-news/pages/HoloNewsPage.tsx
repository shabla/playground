import React from "react"

import { Page } from "@/components";
import { Section, SectionRow, SectionCell, SectionHeader } from "../components/Section";

import akiBanner from "../assets/week1/aki-banner.jpg";
import akiIcon from "../assets/icons/gen1/Aki_Rosenthal_-_Icon.webp";
import akiChibi from "../assets/week1/aki-chibi.png";

import fubukiBanner from "../assets/week1/fubuki-banner.jpg";
import fubukiIcon from "../assets/icons/gamers/Shirakami_Fubuki_-_Icon.webp";

import "./HoloNewsPage.scss";

// Ref: https://www.reddit.com/gallery/tr3g4o

export const HoloNewsPage: React.FC = () => {
  return (
    <Page title="Holo News" className="holo-news-page">
      <Section title="GEN 1">
        <SectionRow>
          <SectionCell>
            <SectionHeader
              banner={akiBanner}
              icon={akiIcon}
              name="Aki"
              color="#03ac13"
            />

            <div className="section__text">
              While trying to remind r/Hololive of the deadline for the orders of her birthday mechandise, Aki accidentally uploaded the same post onto r/Hololive four times. Orders for her merchandise has closed as of March 21st, 6pm JST.
            </div>

            <div className="section__extra">
              <img alt="extra" src={akiChibi} style={{ height: '100px' }} />
            </div>
          </SectionCell>

          <SectionCell>
            <SectionHeader
              banner={fubukiBanner}
              icon={fubukiIcon}
              name="Fubuki"
              color="#226cb4"
            />

            <div className="section__text">
              After disappearing from the public eye for two days, our resident hardcore Otaku Fox Fubuki returned with a tweet. The tweet was a survival report of the things she had done during her disappearance. She watched a lot of anime, one of them being all three current seasons of Overlord in preparation for season four. She also did some recordings and gacha'd a bit, with screenshots of her pulls as proof. Fubuki returned to streaming a day later just like nothing happened.
            </div>
          </SectionCell>
        </SectionRow>
      </Section>

      <Section title="GEN 2">
        <SectionRow>
          <SectionCell>cell 1</SectionCell>
          <SectionCell>cell 2</SectionCell>
        </SectionRow>
      </Section>
    </Page>
  )
}