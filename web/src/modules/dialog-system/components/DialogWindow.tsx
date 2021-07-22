import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, useTrail, animated } from "react-spring";
import { Icon } from "@blueprintjs/core";

import { getAsset } from "../assets";
import { Character, Dialog, DialogStep, DialogOption } from "../models/Dialog";
import { sleep } from "utils/sleep";
import { CornerHighlights } from "./CornerHighlights";

const theme = {
    interlocutor: {
        imageSize: 120,
        imageFrameSize: 8,
        nameHeight: 30,
    },
    borderRadius: 4,
};
const Conversation = styled(animated.div)`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 20px;
    left: 15px;
    right: 15px;
    z-index: 10;
    transition: opacity 0.8s ease-out;
    width: 600px;
`;

const Interlocutor = styled(animated.div)`
    display: flex;
    flex-direction: row;
    overflow: hidden;
`;

const InterlocutorImageFrame = styled.div`
    width: ${theme.interlocutor.imageSize + 2 * theme.interlocutor.imageFrameSize}px;
    height: ${theme.interlocutor.imageSize +
    2 * theme.interlocutor.imageFrameSize +
    theme.interlocutor.nameHeight}px;
    padding: ${theme.interlocutor.imageFrameSize}px;
    border-radius: ${theme.borderRadius}px;
    flex: 0 0 ${theme.interlocutor.imageSize + 2 * theme.interlocutor.imageFrameSize}px;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 6px 3px inset rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 10;
`;

const InterlocutorImage = styled.img`
    height: ${theme.interlocutor.imageSize}px;
    width: ${theme.interlocutor.imageSize}px;
    box-shadow: 0 0 5px black;
    display: block;
`;

const InterlocutorNameTag = styled.div`
    color: #f1ab54;
    font-size: 16px;
    text-align: center;
    line-height: ${theme.interlocutor.nameHeight}px;
`;

const InterlocutorText = styled.div`
    padding: 10px 18px;
    font-size: 22px;
    line-height: 30px;
    border-left: 0;
    border-top-right-radius: ${theme.borderRadius}px;
    border-bottom-right-radius: ${theme.borderRadius}px;
    flex: 1 0 400px; /* this is black magic */
    color: #eee;
    text-shadow: 1px 1px black, 2px 2px #222;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 30px 2px inset rgba(0, 0, 0, 0.5);
    position: relative;
`;

const ConversationChoices = styled.div`
    display: flex;
    flex-direction: column;
`;

const ConversationChoice = styled(animated.div)`
    color: #fff;
    margin-left: ${theme.interlocutor.imageSize + 2 * theme.interlocutor.imageFrameSize}px;
    font-size: 14px;
    padding: 6px 14px;
    text-shadow: 1px 1px black, 2px 2px #222;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 15px 2px inset rgba(0, 0, 0, 0.5);
    border: 1px solid black;
    border-bottom-width: 0;

    &:last-of-type {
        border-bottom-width: 1px;
    }

    :hover {
        background: darkgoldenrod;
        cursor: pointer;
    }
`;

const NextStepIcon = styled(animated(Icon)).attrs({
    icon: "caret-down",
    iconSize: 20,
})`
    color: white;
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

type DialogWindowProps = {
    target: Character;
    onComplete: (target: Character) => void;
};

export const DialogWindow: React.FC<DialogWindowProps> = ({ target, onComplete }) => {
    const [currentDialog, setCurrentDialog] = useState<Dialog>(
        target.dialogs[target.initialDialog]
    );
    const [currentStep, setCurrentStep] = useState<DialogStep & { key?: number }>();
    const [options, setOptions] = useState<DialogOption[]>([]);
    const [showNextIcon, setShowNextIcon] = useState<boolean>(false);

    const interlocutorAnimation = useSpring({
        opacity: 1,
        transform: "translateY(0) scale(1)",
        from: {
            opacity: 0,
            transform: "translateY(-20%) scale(0.9)",
        },
    });

    const conversationAnimation = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    const nextStepIconAnimation = useSpring({
        opacity: 1,
        transform: "scale(1)",
        from: { opacity: 0, transform: "scale(0.5)" },
    });

    const choiceAnimation = useTrail(options.length, {
        opacity: 1,
        transform: "translateY(0)",
        from: { opacity: 0, transform: "translateY(75%)" },
    });

    useEffect(() => {
        if (target) {
            console.log(
                "Update current dialog to initial dialog tree",
                target.dialogs[target.initialDialog]
            );
            setCurrentDialog(target.dialogs[target.initialDialog]);
        }
    }, [target]);

    useEffect(() => {
        const steps = currentDialog?.steps;
        if (steps) {
            console.log("Update current step to first dialog step");
            setCurrentStep(steps[0]);
        }
    }, [currentDialog]);

    useEffect(() => {
        if (currentStep) {
            setOptions(currentStep.options || []);

            const waitingForOption = currentStep.options != null;
            const nextStep = getNextStep(currentDialog, currentStep);

            setShowNextIcon(nextStep !== null);

            if (!waitingForOption && !nextStep) {
                console.log("Not waiting for option and no next step, wait and close");
                sleep(1000).then(() => onComplete(target));
            }
        }
    }, [target, currentDialog, currentStep, onComplete]);

    const getNextStep = (dialog: Dialog, currentStep: DialogStep): DialogStep | null => {
        if (!dialog.steps) {
            return null;
        }
        const currentStepIndex = dialog.steps.indexOf(currentStep);
        if (currentStepIndex < 0 || currentStepIndex >= dialog.steps.length - 1) {
            return null;
        }
        return dialog.steps[currentStepIndex + 1];
    };

    const moveForward = React.useCallback(() => {
        if (!currentDialog || !currentStep) {
            return;
        }

        const waitingForOption = currentStep.options != null;
        const nextStep = getNextStep(currentDialog, currentStep);

        console.log("Waiting for option?", waitingForOption, "Next step:", nextStep);

        if (!waitingForOption && nextStep) {
            setCurrentStep(nextStep);
        } else if (!waitingForOption && !nextStep) {
            onComplete(target);
        }
    }, [currentDialog, currentStep, onComplete, target]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            console.log(e);
            moveForward();
        };

        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
        // this gets recreated every time handlKeyPress changes :(
    }, [currentStep, moveForward]);

    const handleOptionSelected = (option: DialogOption) => {
        console.log("Selected option:", option);
        if (option.next) {
            setCurrentDialog(target.dialogs[option.next]);
        } else {
            onComplete(target);
        }
    };

    return (
        <Conversation style={conversationAnimation}>
            <ConversationChoices>
                {choiceAnimation.map((props, index) => (
                    <ConversationChoice
                        key={index}
                        style={props}
                        onClick={() => handleOptionSelected(options[index])}
                    >
                        {options[index].text}
                    </ConversationChoice>
                ))}
            </ConversationChoices>

            <Interlocutor style={interlocutorAnimation}>
                <InterlocutorImageFrame>
                    <CornerHighlights level="top" side="left" />
                    <CornerHighlights level="top" side="right" />
                    <CornerHighlights level="bottom" side="left" />
                    <CornerHighlights level="bottom" side="right" />
                    <InterlocutorImage src={getAsset(target.portraitImage)} alt="" />
                    <InterlocutorNameTag>{target.name}</InterlocutorNameTag>
                </InterlocutorImageFrame>

                <InterlocutorText onClick={(e) => moveForward()}>
                    <CornerHighlights level="top" side="left" only="horizontal" />
                    <CornerHighlights level="top" side="right" />
                    <CornerHighlights level="bottom" side="left" only="horizontal" />
                    <CornerHighlights level="bottom" side="right" />
 

                    {showNextIcon && <NextStepIcon style={nextStepIconAnimation} />}
                </InterlocutorText>
            </Interlocutor>
        </Conversation>
    );
};

export default DialogWindow;
