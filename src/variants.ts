// import { Variants } from "framer-motion"

type Direction = "up" | "down" | "left" | "right";
export const fadeIn = (direction: Direction, delay: number) => {
    return {
        hidden: {
            y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
            x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0, // reduced translation
            opacity: 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.7,
                delay: delay,
                ease: [0.6, 0.05, -0.01, 0.9],
            },
        },
    };
};

export const fadeOut = (direction: Direction) => {
    return {
        hidden: {
            y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
            x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,

            opacity: 0,
        },
        show: {
            y: direction === 'up' ? 0 : direction === 'down' ? 0 : 0,
            x: direction === 'left' ? 0 : direction === 'right' ? 0 : 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                type: "spring",
                duration: 0.7,
                delay: .3,
                ease: [0.6, 0.05, -0.01, 0.9],
            },
        },
    };
};
