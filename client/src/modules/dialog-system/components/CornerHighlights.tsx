import styled from "styled-components";

type CornerHighlightsProps = {
    side: "left" | "right";
    level: "top" | "bottom";
    only?: "vertical" | "horizontal";
};

const theme = {
    highlightColor: "#ffffffab",
    highlightSize: "50px",
};

export const CornerHighlights = styled.div`
    width: ${theme.highlightSize};
    height: ${theme.highlightSize};
    position: absolute;
    ${(props: CornerHighlightsProps) => `${props.side}: 0;`}
    ${(props: CornerHighlightsProps) => `${props.level}: 0;`}

    /* Horizontal Highlight */
    :before {
        content: "";
        height: 1px;
        width: ${theme.highlightSize};
        position: absolute;
        
        ${(props: CornerHighlightsProps) => `${props.level}: 0;`}
        ${(props: CornerHighlightsProps) =>
            !props.only || props.only === "horizontal"
                ? `background: linear-gradient(to ${props.side}, transparent, ${theme.highlightColor});`
                : ""}
    }

    /* Vertical Highlight */
    :after {
        content: "";
        height: ${theme.highlightSize};
        width: 1px;
        position: absolute;
        ${(props: CornerHighlightsProps) => `${props.side}: 0;`}
        ${(props: CornerHighlightsProps) =>
            !props.only || props.only === "vertical"
                ? `background: linear-gradient(to ${props.level}, transparent, ${theme.highlightColor});`
                : ""}
    }
`;

export default CornerHighlights;