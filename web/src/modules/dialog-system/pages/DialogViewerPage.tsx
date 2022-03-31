import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Icon } from "@blueprintjs/core";

import { Navbar, PageTitle } from "@/components";
import { getAsset } from "../assets";
import { Character } from "../models/Dialog";
import { DialogWindow } from "../components/DialogWindow";

const visibleCharacters: Character[] = [getAsset("characters.json")["cat_mcmeow"]];

const Page = styled.div`
    padding: 10px;
    position: relative;
    height: calc(100vh - 50px);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

type BackgroundProps = { focused: boolean };
const Background = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-image: url(${getAsset("images/grass.png")});
    background-repeat: repeat;
    background-size: 64px 64px;
    filter: blur(${(props: BackgroundProps) => (props.focused ? 1 : 0)});
    transition: filter 0.6s ease-in-out;
`;

type CharacterEntityProps = { active: boolean };
const CharacterEntity = styled.div`
    position: relative;
    z-index: 1;

    img {
        height: 150px;
        transition: filter 0.2s ease;

        :hover {
            cursor: pointer;
            filter: drop-shadow(0px 0px 1px #00ff00) drop-shadow(0px 0px 1px #00ff00)
                drop-shadow(0px 0px 1px #00ff00);
        }

        ${(props: CharacterEntityProps) =>
    props.active
      ? `
                filter: 
                    drop-shadow(0px 0px 1px #00ff00) 
                    drop-shadow(0px 0px 1px #00ff00)
                    drop-shadow(0px 0px 1px #00ff00);
            `
      : ""}
    }
`;

type BackbarProps = { pos: "top" | "bottom" };
const AnimatedBlackBar = styled(animated.div)`
    position: absolute;
    z-index: 5;
    left: 0;
    right: 0;
    background: black;
    ${(props: BackbarProps) => (props.pos ? `${props.pos}: 0;` : "")}
`;

const QuestIcon = styled(Icon).attrs({
  icon: "error",
  iconSize: 40,
})`
    @keyframes floaty {
        0% {
            transform: translate(-50%, -10px);
        }
        50% {
            transform: translate(-50%, -20px);
        }
        100% {
            transform: translate(-50%, -10px);
        }
    }

    color: #ffdd37;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -20px);
    z-index: 5;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
    animation: 1s floaty ease infinite;

    :hover {
        cursor: pointer;
    }
`;

export const DialogViewerPage: React.FC = () => {
  const [target, setTarget] = useState<Character | null>(null);

  const blackBarProps = useSpring({
    height: target ? "15%" : "0%",
    opacity: target ? 1 : 0,
  });

  return (
    <Page>
      <PageTitle title="Dialog Viewer" />
      <Navbar />
      <Background focused={target != null} />
      <AnimatedBlackBar pos="top" style={blackBarProps} />
      <AnimatedBlackBar pos="bottom" style={blackBarProps} />

      {visibleCharacters.map((character: Character, index) => (
        <div style={{ position: "relative" }} key={index}>
          <QuestIcon onClick={() => setTarget(character)} />
          <CharacterEntity key={index} active={target === character}>
            <img
              src={getAsset(character.worldImage)}
              alt={character.name}
              onClick={() => setTarget(character)}
            />
          </CharacterEntity>
        </div>
      ))}

      {target && (
        <DialogWindow
          target={target}
          onComplete={(target: Character) => {
            console.log("dialog is over");
            setTarget(null);
          }}
        />
      )}
    </Page>
  );
};

export default DialogViewerPage;
